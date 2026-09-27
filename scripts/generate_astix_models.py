"""Build editable, volumetric ASTIX concept models from the supplied single-view art.

Run: blender --background --factory-startup --python scripts/generate_astix_models.py
The PNG is used only for the exact insignia decal. Body, sole, laces, sleeves,
hood and trims are actual meshes and remain visible from every viewing angle.
"""
import bpy
import math
from mathutils import Vector
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "models"
OUTPUT.mkdir(parents=True, exist_ok=True)
ICON = str(ROOT / "public" / "astix-icon.png")

PALE = (0.92, 0.91, 0.88, 1)
WHITE = (0.98, 0.97, 0.95, 1)
BLACK = (0.055, 0.052, 0.055, 1)
CHARCOAL = (0.12, 0.115, 0.12, 1)
CRIMSON = (0.69, 0.025, 0.065, 1)
BURGUNDY = (0.24, 0.018, 0.035, 1)
GREY = (0.55, 0.54, 0.52, 1)

PALETTES = {
    "white": (WHITE, CRIMSON, PALE, BLACK),
    "black": (CHARCOAL, CRIMSON, BLACK, PALE),
    "crimson": (CRIMSON, BURGUNDY, CHARCOAL, WHITE),
}


def material(name, rgba, roughness=0.65, metallic=0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = rgba
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = rgba
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return m


def logo_material(color):
    m = material("Exact ASTIX insignia", color, 0.55)
    nodes = m.node_tree.nodes
    tex = nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(ICON, check_existing=True)
    tex.image.pack()
    bsdf = nodes.get("Principled BSDF")
    m.node_tree.links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
    m.surface_render_method = "DITHERED"
    return m


def smooth(obj):
    if obj.type == "MESH":
        for p in obj.data.polygons:
            p.use_smooth = True
    return obj


def bevel(obj, amount=0.035, segments=2):
    mod = obj.modifiers.new("softly rounded construction", "BEVEL")
    mod.width = amount
    mod.segments = segments
    obj.modifiers.new("weighted normals", "WEIGHTED_NORMAL")
    return obj


def cube(name, loc, scale, mat, bevel_width=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    if bevel_width:
        bevel(obj, bevel_width)
    return obj


def ellipsoid(name, loc, scale, mat, segments=24, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    return smooth(obj)


def loft(name, sections, mat, sides=20):
    # sections: (length position, half width, bottom height, top height)
    verts = []
    faces = []
    for x, width, bottom, top in sections:
        for j in range(sides):
            angle = j * math.tau / sides
            verts.append((x, width * math.cos(angle),
                          (bottom + top) / 2 + (top - bottom) / 2 * math.sin(angle)))
    for k in range(len(sections) - 1):
        for j in range(sides):
            a = k * sides + j
            b = k * sides + (j + 1) % sides
            faces.append((a, b, b + sides, a + sides))
    faces.extend([tuple(reversed(range(sides))), tuple((len(sections)-1)*sides+j for j in range(sides))])
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return smooth(obj)


def line(name, points, radius, mat, cyclic=False):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 12
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for control, point in zip(spline.points, points):
        control.co = (*point, 1)
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def decal(name, loc, size, mat):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler.x = math.pi / 2
    obj.scale = (size, size, size)
    obj.data.materials.append(mat)
    return obj


def make_sneaker(base, accent, neutral, contrast):
    outsole = material("outsole rubber", accent, 0.84)
    midsole = material("sculpted EVA midsole", neutral, 0.7)
    upper = material("technical mesh upper", base, 0.85)
    overlay = material("leather overlays", base, 0.52)
    piping = material("crimson piping", accent, 0.52)
    lining = material("collar lining", accent, 0.94)
    dark = material("recesses", contrast, 0.88)
    eyelet = material("anodized eyelets", accent, 0.35, 0.25)
    logo = logo_material(contrast if base == WHITE else (WHITE if base == CRIMSON else CRIMSON))

    profile = [(-1.68,.28),(-1.53,.48),(-1.14,.54),(-.65,.58),(0,.61),(.6,.57),(1.12,.51),(1.51,.38),(1.68,.19)]
    loft("deep traction outsole", [(x,w*.97,-.12,.13) for x,w in profile], outsole)
    loft("full volume midsole", [(x,w,.05,.35 if x<1.4 else .29) for x,w in profile], midsole)
    loft("upper volume", [
        (-1.55,.20,.29,.54),(-1.38,.39,.31,.72),(-1.10,.45,.32,.90),
        (-.7,.48,.32,1.05),(-.25,.50,.33,.97),(.3,.50,.33,.78),
        (.8,.46,.32,.62),(1.3,.39,.29,.49),(1.55,.23,.26,.36)
    ], upper)

    # Molded side walls and crimson outsole pods are volumetric, not image cards.
    for sign in (-1, 1):
        y = sign * .54
        ellipsoid("heel stabilizer", (-1.07, sign*.49, .4), (.47,.09,.21), midsole)
        ellipsoid("arch support", (-.38, sign*.55, .27), (.43,.095,.17), piping)
        ellipsoid("forefoot guard", (1.18, sign*.40, .24), (.38,.085,.16), piping)
        ellipsoid("air window", (-.84, sign*.585, .19), (.23,.035,.09), dark)
        ellipsoid("air core", (-.84, sign*.62, .19), (.14,.025,.055), piping)
        # Slightly raised quarter panel with stitched perimeter.
        ellipsoid("quarter leather panel", (-.28, sign*.45, .55), (.55,.115,.30), overlay)
        line("quarter perimeter", [(-.75,y,.48),(-.61,y,.69),(-.16,y,.78),(.24,y,.66),(.27,y,.46),(-.03,y,.35),(-.58,y,.38),(-.75,y,.48)], .015, piping)
        line("heel sweep", [(-1.46,sign*.37,.43),(-1.2,y,.56),(-.88,y,.49),(-.7,y,.31)], .027, piping)
        line("toe rand", [(.53,sign*.49,.34),(.91,sign*.47,.39),(1.28,sign*.38,.36),(1.52,sign*.23,.28)], .023, piping)
        if sign == -1:
            decal("exact ASTIX mark on quarter", (-.3,-.574,.58), .27, logo)

    # Tongue, raised eyestays and braided laces.
    ellipsoid("tongue", (.18,0,.86), (.69,.23,.19), overlay)
    ellipsoid("tongue crest", (-.33,0,1.03), (.31,.24,.19), overlay)
    line("left eyestay", [(-.36,-.27,.92),(-.12,-.33,.9),(.34,-.32,.78),(.76,-.27,.64)], .047, piping)
    line("right eyestay", [(-.36,.27,.92),(-.12,.33,.9),(.34,.32,.78),(.76,.27,.64)], .047, piping)
    for i in range(6):
        x = -.25 + i*.19
        h = .98 - i*.052
        for sign in (-1,1):
            ellipsoid("metal lace eyelet", (x, sign*(.27+i*.006), h-.015), (.05,.04,.024), eyelet, 12, 6)
        line("woven cross lace", [(x,-.28,h),(x+.05,-.12,h+.048),(x+.10,.12,h+.048),(x+.14,.28,h-.02)], .026, midsole)
    # Collared ankle opening with a dark recessed cavity and a real pull loop.
    ellipsoid("ankle cavity", (-1.0,0,.91), (.36,.34,.12), dark)
    bpy.ops.mesh.primitive_torus_add(major_radius=.34, minor_radius=.08, location=(-1.0,0,.94))
    collar = bpy.context.object
    collar.name = "padded crimson collar"
    collar.scale = (1.13,1.04,1)
    collar.data.materials.append(lining)
    smooth(collar)
    line("heel pull tab", [(-1.46,0,.85),(-1.53,0,1.17),(-1.43,0,1.27),(-1.34,0,1.07)], .055, piping)
    for x in (.95,1.1,1.25):
        for y in (-.15,0,.15):
            ellipsoid("toe ventilation", (x,y,.51-(x-.95)*.22), (.013,.013,.005), dark, 8, 4)
    # Outsole tread ribs are visible from the underside during genuine rotation.
    for x in [-1.4+i*.19 for i in range(16)]:
        line("outsole traction rib", [(x,-.35,-.125),(x,.35,-.125)], .012, dark)


def cone_between(name, top, bottom, top_radius, bottom_radius, mat):
    a, b = Vector(top), Vector(bottom)
    midpoint = (a+b)/2
    direction = a-b
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=bottom_radius, radius2=top_radius,
                                    depth=direction.length, location=midpoint)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler = direction.to_track_quat("Z","Y").to_euler()
    obj.data.materials.append(mat)
    bevel(obj,.025)
    return smooth(obj)


def make_jacket(base, accent, neutral, contrast):
    shell = material("waterproof technical shell", base, .86)
    panels = material("architectural shoulder panels", neutral, .81)
    seam = material("welded seams", neutral, .83)
    trim = material("crimson zipper tape", accent, .67)
    interior = material("hood interior", accent, .94)
    zip_dark = material("waterproof zip teeth", contrast, .48, .1)
    logo = logo_material(contrast if base == WHITE else WHITE)

    # Elliptical torso loft: front, side and back have genuine volume.
    rings = [(-1.02,.64,.28),(-.82,.7,.3),(-.35,.69,.31),(.28,.77,.34),(.75,.86,.37),(1.02,.74,.33),(1.2,.42,.27)]
    verts, faces, sides = [], [], 24
    for z, width, depth in rings:
        for j in range(sides):
            a = j*math.tau/sides
            verts.append((width*math.cos(a),depth*math.sin(a),z))
    for i in range(len(rings)-1):
        for j in range(sides):
            a=i*sides+j
            b=i*sides+(j+1)%sides
            faces.append((a,b,b+sides,a+sides))
    faces.extend([tuple(reversed(range(sides))),tuple((len(rings)-1)*sides+j for j in range(sides))])
    mesh=bpy.data.meshes.new("tailored torso")
    mesh.from_pydata(verts,[],faces)
    mesh.update()
    obj=bpy.data.objects.new("full volume shell torso",mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(shell)
    smooth(obj)

    for sign in (-1,1):
        shoulder=(sign*.79,.0,.94)
        elbow=(sign*1.13,.01,.05)
        cuff=(sign*1.34,-.01,-.79)
        cone_between("articulated upper sleeve",shoulder,elbow,.29,.25,shell)
        ellipsoid("elbow articulation",elbow,(.27,.27,.27),shell)
        cone_between("articulated lower sleeve",elbow,cuff,.25,.19,shell)
        cone_between("hook-and-loop cuff", (sign*1.32,-.01,-.66), (sign*1.35,-.01,-.86), .205,.18,panels)
        line("sleeve seam", [(sign*.87,-.18,.72),(sign*1.03,-.22,.33),(sign*1.15,-.19,.02),
                             (sign*1.26,-.16,-.55)], .013, seam)
        line("sleeve piping", [(sign*.88,-.20,.78),(sign*1.04,-.23,.38),
                               (sign*1.19,-.20,-.22)], .013, trim)
        # Slanted waterproof pockets on the two front panels.
        line("waterproof pocket zip", [(sign*.48,-.34,-.10),(sign*.51,-.32,-.72)], .022, trim)
        ellipsoid("pocket zip pull", (sign*.51,-.355,-.13), (.03,.025,.065),zip_dark,12,8)
        line("shoulder yoke seam",[(sign*.11,-.31,1.09),(sign*.45,-.35,.98),
                                   (sign*.77,-.24,.76)],.012,seam)

    # A curved hood shell with dark aperture and contrasting liner.
    ellipsoid("hood rear structure", (0,.14,1.46), (.56,.36,.52),shell)
    ellipsoid("hood aperture recess", (0,-.244,1.46), (.40,.035,.32),zip_dark)
    ellipsoid("crimson hood lining", (0,-.274,1.46), (.34,.027,.26),interior)
    bpy.ops.mesh.primitive_torus_add(major_radius=.40,minor_radius=.075,location=(0,-.31,1.46))
    hood=bpy.context.object
    hood.name="rolled storm hood edge"
    hood.rotation_euler.x=math.pi/2
    hood.scale=(1.18,.98,1)
    hood.data.materials.append(shell)
    smooth(hood)
    # Front zip, collar, hem, and drawcords.
    cube("front waterproof zipper tape",(0,-.345,.04),(.09,.015,2.05),trim,.012)
    cube("zipper teeth",(0,-.359,.04),(.025,.013,2.05),zip_dark,.003)
    ellipsoid("zipper pull",(0,-.38,.91),(.045,.026,.085),trim,12,8)
    line("hem weld", [(-.68,-.16,-.95),(-.4,-.27,-1.01),(0,-.29,-1.025),(.4,-.27,-1.01),(.68,-.16,-.95)], .016,seam)
    for x in (-.3,.3):
        line("hood drawcord",[(x,-.32,1.52),(x,-.40,1.21),(x,-.40,1.02)],.012,trim)
        ellipsoid("cord stop",(x,-.4,1.03),(.028,.022,.04),zip_dark,12,8)
    decal("exact ASTIX chest insignia",(.41,-.37,.65),.18,logo)


def export(kind, colorway):
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for m in list(bpy.data.materials):
        if m.users == 0:
            bpy.data.materials.remove(m)
    base,accent,neutral,contrast=PALETTES[colorway]
    if kind=="sneaker":
        make_sneaker(base,accent,neutral,contrast)
    else:
        make_jacket(base,accent,neutral,contrast)
    path=OUTPUT/f"{kind}-{colorway}.glb"
    bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",export_apply=True,
                              export_cameras=False,export_lights=False)
    print("WROTE",path,path.stat().st_size)


for kind in ("sneaker","jacket"):
    for colorway in PALETTES:
        export(kind,colorway)
