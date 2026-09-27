"""Render local QA views for the generated GLBs."""
import bpy
import math
import os
from mathutils import Vector
from pathlib import Path

root = Path(__file__).resolve().parents[1]
out = Path(os.environ.get("TEMP", str(root))) / "astix-model-qa"
out.mkdir(exist_ok=True)

for kind, angle in (("sneaker", "front"), ("sneaker", "back"), ("jacket", "front"), ("jacket", "back")):
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    bpy.ops.import_scene.gltf(filepath=str(root / "public" / "models" / f"{kind}-white.glb"))
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH":
            for material in obj.data.materials:
                if material:
                    material.use_nodes = True
    bpy.ops.object.camera_add()
    camera = bpy.context.object
    target = Vector((0, 0, .55 if kind == "sneaker" else .25))
    camera.location = Vector((2.4, -6, 2.0) if kind == "sneaker" and angle == "front"
                             else (-2.4, 6, 2.0) if kind == "sneaker"
                             else (0, -6, .55) if angle == "front" else (0, 6, .55))
    camera.rotation_euler = (target - camera.location).to_track_quat("-Z", "Y").to_euler()
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 4.4 if kind == "sneaker" else 3.9
    bpy.context.scene.camera = camera
    for location, power, size in (((-3,-4,5),700,5),((3,2,4),500,4)):
        bpy.ops.object.light_add(type="AREA", location=location)
        light=bpy.context.object
        light.data.energy=power
        light.data.shape="DISK"
        light.data.size=size
    scene=bpy.context.scene
    scene.render.engine="CYCLES"
    scene.cycles.samples=32
    scene.render.resolution_x=scene.render.resolution_y=640
    scene.render.resolution_percentage=100
    scene.render.image_settings.file_format="PNG"
    scene.render.film_transparent=False
    scene.world.color=(.88,.86,.82)
    scene.render.filepath=str(out / f"{kind}-{angle}.png")
    bpy.ops.render.render(write_still=True)
    print("RENDERED",scene.render.filepath)
