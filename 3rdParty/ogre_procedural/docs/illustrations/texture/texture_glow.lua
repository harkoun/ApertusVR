buffer = Procedural.TextureBuffer(128)
Procedural.Gradient(buffer):process()
Procedural.Glow(buffer):process()
tests:addTextureBuffer(buffer)
dotfile = tests:getDotFile("texture_15", "Glow_Demo")
dotfile:set("Gradient", "texture_gradient", "Glow", "texture_glow")