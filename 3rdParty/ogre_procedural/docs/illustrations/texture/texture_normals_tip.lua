buffer = Procedural.TextureBuffer(128)
Procedural.Cell(buffer):setDensity(4):setRegularity(234):process()
Procedural.Colours(buffer):setColourBase(Procedural.ColourValue_Red):setColourPercent(Procedural.ColourValue_Blue):process()
tests:addTextureBuffer(buffer)
dotfile = tests:getDotFile("texture_21b", "Normals_2_Demo")
dotfile:set("Cell", "texture_cell_smooth", "Normals", "texture_normals", "Colours", "texture_normals_tip", dotFile_SPLIT)
