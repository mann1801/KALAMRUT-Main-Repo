const paintings = [
  {
    "id": 1,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2024",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/BDF33008-C918-4768-B2BC-9BC25F00BF34.jpeg",
    "price": 218.64,
    "category": "Landscape Photography"
  },
  {
    "id": 2,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2015",
    "description": "A a sunset at the pier with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/8A15CA1B-3612-41A0-8AE9-3233E69E78BF.jpeg",
    "price": 170.28,
    "category": "Seascape Photography"
  },
  {
    "id": 3,
    "name": "A Calm Mountain Lake Storm Clouds Over The Ocean",
     
    "year": "2014",
    "description": "A storm clouds over the ocean with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/701424CA-32CB-4F53-99C0-4D2C5AADC72C.jpeg",
    "price": 162.95,
    "category": "Seascape Photography"
  },
  {
    "id": 4,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2013",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as botanical photography.",
    "image": "/new_paintings/2EC200ED-23FB-42BA-8333-48D91B770FA6.jpeg",
    "price": 186.56,
    "category": "Botanical Photography"
  },
  {
    "id": 5,
    "name": "A Sunrise Over Mountains in Snowy Mountains",
     
    "year": "2016",
    "description": "A a sunrise over mountains with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/786DA5B2-0997-417B-B9DE-A98C7031D3FD.jpeg",
    "price": 254.28,
    "category": "Landscape Photography"
  },
  {
    "id": 6,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2022",
    "description": "A a forest pathway with a foggy forest, rendered as black and white photography.",
    "image": "/new_paintings/C190511A-34D0-43BD-AF12-553F597EE3B0.jpeg",
    "price": 181.59,
    "category": "Black and White Photography"
  },
  {
    "id": 7,
    "name": "Dream of A Forest Pathway",
     
    "year": "2022",
    "description": "A a forest pathway with autumn foliage, rendered as impressionist painting.",
    "image": "/new_paintings/5019F3C8-8A77-4BDD-9DE6-F2424673E0FF.jpeg",
    "price": 328.13,
    "category": "Impressionist Painting"
  },
  {
    "id": 8,
    "name": "Autumn Foliage Wildflowers In A Meadow",
     
    "year": "2019",
    "description": "A wildflowers in a meadow with autumn foliage, rendered as botanical photography.",
    "image": "/new_paintings/BE52BA7F-720A-4C88-9332-198DC3223710.jpeg",
    "price": 197.59,
    "category": "Botanical Photography"
  },
  {
    "id": 9,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2017",
    "description": "A a forest pathway with a foggy forest, rendered as nature photography.",
    "image": "/new_paintings/B72082F6-C3AD-4311-BBEF-713D39A06E5C.jpeg",
    "price": 248.31,
    "category": "Nature Photography"
  },
  {
    "id": 10,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2013",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/6109997C-1AA2-4800-91AA-65AD15DADD25.jpeg",
    "price": 158.58,
    "category": "Seascape Photography"
  },
  {
    "id": 11,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2017",
    "description": "A a sunset at the pier with a calm mountain lake, rendered as landscape photography.",
    "image": "/new_paintings/7FB8608F-4022-4E11-89BA-8C7BC01008B7.jpeg",
    "price": 161.05,
    "category": "Landscape Photography"
  },
  {
    "id": 12,
    "name": "Poem of A Glacier And Iceberg",
     
    "year": "2021",
    "description": "A a glacier and iceberg with a calm mountain lake, rendered as nature photography.",
    "image": "/new_paintings/9E4CBFAA-FA7B-4CDA-A532-DA56155BE114.jpeg",
    "price": 191.84,
    "category": "Nature Photography"
  },
  {
    "id": 13,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2018",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/15C660ED-0DFC-4552-B282-220FD08312BA.jpeg",
    "price": 181.28,
    "category": "Botanical Photography"
  },
  {
    "id": 14,
    "name": "Echoes of A Lotus Pond",
     
    "year": "2024",
    "description": "A a lotus pond with a potted cactus, rendered as botanical photography.",
    "image": "/new_paintings/A888C26B-4DF1-41A5-BB21-117A02F2A83E.jpeg",
    "price": 167.32,
    "category": "Botanical Photography"
  },
  {
    "id": 15,
    "name": "A Desert With Sand Dunes A Beach With Gentle Waves",
     
    "year": "2019",
    "description": "A a beach with gentle waves with a desert with sand dunes, rendered as seascape photography.",
    "image": "/new_paintings/E996E309-7CA6-4D04-8963-A11AF02EBD8D.jpeg",
    "price": 210.63,
    "category": "Seascape Photography"
  },
  {
    "id": 16,
    "name": "Echoes of A Beach With Gentle Waves",
     
    "year": "2017",
    "description": "A a beach with gentle waves with geometric abstract shapes, rendered as landscape photography.",
    "image": "/new_paintings/4562AD23-3AAE-4CAF-AB93-8A5DE52F2B4A.jpeg",
    "price": 155.33,
    "category": "Landscape Photography"
  },
  {
    "id": 17,
    "name": "A Sunset At The Pier A Sunrise Over Mountains",
     
    "year": "2025",
    "description": "A a sunrise over mountains with a sunset at the pier, rendered as nature photography.",
    "image": "/new_paintings/4EDAC73E-5E86-471B-9B94-E0780A249BC9.jpeg",
    "price": 231.31,
    "category": "Nature Photography"
  },
  {
    "id": 18,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2015",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as macro photography.",
    "image": "/new_paintings/98DECA2C-1D4A-4A88-BB7B-8B947E76F4B6.jpeg",
    "price": 118.2,
    "category": "Macro Photography"
  },
  {
    "id": 19,
    "name": "Under Cherry Blossoms: A Potted Cactus",
     
    "year": "2023",
    "description": "A a potted cactus with cherry blossoms, rendered as botanical photography.",
    "image": "/new_paintings/EFCF36C6-2086-4683-952E-17F3951D74A2.jpeg",
    "price": 159.54,
    "category": "Botanical Photography"
  },
  {
    "id": 20,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2018",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as macro photography.",
    "image": "/new_paintings/997665DE-EFFD-4FA8-9594-05608F83FFC4.jpeg",
    "price": 208.95,
    "category": "Macro Photography"
  },
  {
    "id": 21,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2022",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/39D5A447-1BAC-4B0B-83A5-3C53083934B2.jpeg",
    "price": 204.22,
    "category": "Nature Photography"
  },
  {
    "id": 22,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2014",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as botanical photography.",
    "image": "/new_paintings/A6BEA7B4-7989-4DF3-9BFF-DC870C4FD3E1.jpeg",
    "price": 99.05,
    "category": "Botanical Photography"
  },
  {
    "id": 23,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2025",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/4ECC047F-9F80-4A31-A933-857A2C17ADCA.jpeg",
    "price": 257.42,
    "category": "Seascape Photography"
  },
  {
    "id": 24,
    "name": "A Sunrise Over Mountains in Snowy Mountains",
     
    "year": "2022",
    "description": "A a sunrise over mountains with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/C3B5F446-193A-4498-B563-4A49E94A8B52.jpeg",
    "price": 202.23,
    "category": "Landscape Photography"
  },
  {
    "id": 25,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2017",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as seascape photography.",
    "image": "/new_paintings/7BEE5690-AB89-46F3-B416-904D202AC72A.jpeg",
    "price": 191.47,
    "category": "Seascape Photography"
  },
  {
    "id": 26,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2017",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/3D30DB79-DCC6-438A-A85F-271BAE58382C.jpeg",
    "price": 157.58,
    "category": "Landscape Photography"
  },
  {
    "id": 27,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2013",
    "description": "A a potted cactus with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/559A3EE8-D20C-4A18-BF3F-6DD2C008EC75.jpeg",
    "price": 101.37,
    "category": "Macro Photography"
  },
  {
    "id": 28,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2024",
    "description": "A a glacier and iceberg with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/44B22212-9564-49F5-99CB-54C6AA83C206.jpeg",
    "price": 216.78,
    "category": "Nature Photography"
  },
  {
    "id": 29,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2018",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/07921D20-67D9-497D-A4F7-8A767A1879B3.jpeg",
    "price": 193.77,
    "category": "Seascape Photography"
  },
  {
    "id": 30,
    "name": "Dream of A Ceramic Vase On A Table",
     
    "year": "2022",
    "description": "A a ceramic vase on a table with wildflowers in a meadow, rendered as still life photography.",
    "image": "/new_paintings/B7F60B27-FAAF-4300-AD73-3B56DED06FDD.jpeg",
    "price": 165.61,
    "category": "Still Life Photography"
  },
  {
    "id": 31,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2016",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/BF873E07-3C53-4CE8-86B0-ED6CBA9CF323.jpeg",
    "price": 146.29,
    "category": "Landscape Photography"
  },
  {
    "id": 32,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2019",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/2DC037C9-1C69-4821-886D-D65F8944D254.jpeg",
    "price": 213.6,
    "category": "Aerial Photography"
  },
  {
    "id": 33,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2015",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as aerial photography.",
    "image": "/new_paintings/DF76B6EE-F97A-4195-8578-8DA36D82889C.jpeg",
    "price": 168.89,
    "category": "Aerial Photography"
  },
  {
    "id": 34,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2016",
    "description": "A a forest pathway with a foggy forest, rendered as nature photography.",
    "image": "/new_paintings/D7DE7251-3896-4CAB-99D5-7D4226C45E71.jpeg",
    "price": 149.97,
    "category": "Nature Photography"
  },
  {
    "id": 35,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2019",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as macro photography.",
    "image": "/new_paintings/2C7D2882-A5E7-49C2-AF19-F6A521255449.jpeg",
    "price": 150.48,
    "category": "Macro Photography"
  },
  {
    "id": 36,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2021",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/295C7ADF-77BB-4AF2-B163-DECDB2673FEC.jpeg",
    "price": 227.32,
    "category": "Seascape Photography"
  },
  {
    "id": 37,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2017",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/3CA8318F-983C-497D-BD77-1FDCA7060C21.jpeg",
    "price": 161.24,
    "category": "Landscape Photography"
  },
  {
    "id": 38,
    "name": "Dream of A Wooden Boat On A Lake",
     
    "year": "2018",
    "description": "A a wooden boat on a lake with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/E51B2633-50D5-4E94-A5AA-BEA41D4EC922.jpeg",
    "price": 288.79,
    "category": "Seascape Photography"
  },
  {
    "id": 39,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2018",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/40662D5A-CBEE-4D52-9855-F43F698A1D5E.jpeg",
    "price": 168.71,
    "category": "Nature Photography"
  },
  {
    "id": 40,
    "name": "A Sunset At The Pier A Sunrise Over Mountains",
     
    "year": "2013",
    "description": "A a sunrise over mountains with a sunset at the pier, rendered as landscape photography.",
    "image": "/new_paintings/5BB1828C-A0F7-4FAD-9E5E-B84EEE040C01.jpeg",
    "price": 125.09,
    "category": "Landscape Photography"
  },
  {
    "id": 41,
    "name": "A Bridge Over A River A Beach With Gentle Waves",
     
    "year": "2013",
    "description": "A a beach with gentle waves with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/87EB5873-B3F3-4F82-9E4D-4C0178A31422.jpeg",
    "price": 155.5,
    "category": "Seascape Photography"
  },
  {
    "id": 42,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2022",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/5177F177-4E5C-47F8-9059-7425D9C5C3E3.jpeg",
    "price": 274.27,
    "category": "Aerial Photography"
  },
  {
    "id": 43,
    "name": "A Potted Cactus at A Peacock With Feathers Spread",
     
    "year": "2025",
    "description": "A a potted cactus with a peacock with feathers spread, rendered as botanical photography.",
    "image": "/new_paintings/3B2FEBDD-A494-46EC-8345-47BB32064708.jpeg",
    "price": 182.6,
    "category": "Botanical Photography"
  },
  {
    "id": 44,
    "name": "A Beach With Gentle Waves in A Sunset At The Pier",
     
    "year": "2015",
    "description": "A a beach with gentle waves with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/92E4EB7B-A19D-4E96-84E3-DC6112AE4FCF.jpeg",
    "price": 172.21,
    "category": "Seascape Photography"
  },
  {
    "id": 45,
    "name": "Autumn Foliage Wildflowers In A Meadow",
     
    "year": "2020",
    "description": "A wildflowers in a meadow with autumn foliage, rendered as botanical photography.",
    "image": "/new_paintings/CD4E3AC8-8504-42B9-A4EC-144336E07B35.jpeg",
    "price": 140.7,
    "category": "Botanical Photography"
  },
  {
    "id": 46,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2015",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/C98E9FA1-B6CB-4589-87D2-E667AE92C9CD.jpeg",
    "price": 174.0,
    "category": "Seascape Photography"
  },
  {
    "id": 47,
    "name": "Dream of A Beach With Gentle Waves",
     
    "year": "2023",
    "description": "A a beach with gentle waves with a wooden boat on a lake, rendered as seascape photography.",
    "image": "/new_paintings/F1394BA7-8566-4E5D-A86F-F0C4EB49697F.jpeg",
    "price": 244.53,
    "category": "Seascape Photography"
  },
  {
    "id": 48,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2017",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/15AB73A3-64FD-40D1-8208-E249D7D522B1.jpeg",
    "price": 264.12,
    "category": "Seascape Photography"
  },
  {
    "id": 49,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2013",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as botanical photography.",
    "image": "/new_paintings/F81D8CC0-7B20-450F-90A8-E21AB4CF73D8.jpeg",
    "price": 93.79,
    "category": "Botanical Photography"
  },
  {
    "id": 50,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2023",
    "description": "A a rainbow over hills with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/65B36ECB-34CD-4107-8017-C14E17BD7888.jpeg",
    "price": 211.22,
    "category": "Nature Photography"
  },
  {
    "id": 51,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2022",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/A0EC9061-22A3-4E7F-8662-39D46527DE57.jpeg",
    "price": 205.04,
    "category": "Landscape Photography"
  },
  {
    "id": 52,
    "name": "Under A Sunrise Over Mountains: A Desert With Sand Dunes",
     
    "year": "2013",
    "description": "A a desert with sand dunes with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/22CD7A3E-6B5D-4B6A-82C5-C7CCC5FCFFE5.jpeg",
    "price": 152.79,
    "category": "Seascape Photography"
  },
  {
    "id": 53,
    "name": "Quiet A Bird Perched On A Branch",
     
    "year": "2022",
    "description": "A a bird perched on a branch with a potted cactus, rendered as nature photography.",
    "image": "/new_paintings/CCB6C98A-7151-4A57-90BB-86FB8FD3EDA4.jpeg",
    "price": 207.33,
    "category": "Nature Photography"
  },
  {
    "id": 54,
    "name": "A Calm Mountain Lake Storm Clouds Over The Ocean",
     
    "year": "2025",
    "description": "A storm clouds over the ocean with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/B6C610AA-49A9-4D56-A9CC-622D74F1CCFD.jpeg",
    "price": 261.78,
    "category": "Seascape Photography"
  },
  {
    "id": 55,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2014",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/51560427-40CC-451D-8D11-BEAB8F986CD0.jpeg",
    "price": 160.91,
    "category": "Seascape Photography"
  },
  {
    "id": 56,
    "name": "Fluid Paint Swirls in Seashells In A Basket",
     
    "year": "2020",
    "description": "A fluid paint swirls with seashells in a basket, rendered as macro photography.",
    "image": "/new_paintings/B86FC23E-B6C7-4A7C-83F8-8C8F3FF77741.jpeg",
    "price": 154.13,
    "category": "Macro Photography"
  },
  {
    "id": 57,
    "name": "A Sunset At The Pier & A Lighthouse By The Sea",
     
    "year": "2025",
    "description": "A a sunset at the pier with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/7D32A0B4-D081-4792-9CDF-FA07F4C57C26.jpeg",
    "price": 255.7,
    "category": "Seascape Photography"
  },
  {
    "id": 58,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2022",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as impressionist painting.",
    "image": "/new_paintings/8DFCFB0E-1447-41F0-B68D-9B03587F929F.jpeg",
    "price": 327.62,
    "category": "Impressionist Painting"
  },
  {
    "id": 59,
    "name": "A Butterfly On Flowers at Wildflowers In A Meadow",
     
    "year": "2015",
    "description": "A a butterfly on flowers with wildflowers in a meadow, rendered as nature photography.",
    "image": "/new_paintings/5A2B4963-BF3E-4E71-AE47-18B40B65638B.jpeg",
    "price": 141.15,
    "category": "Nature Photography"
  },
  {
    "id": 60,
    "name": "Poem of A Glacier And Iceberg",
     
    "year": "2021",
    "description": "A a glacier and iceberg with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/0A270088-F35C-46EB-B8F5-264B31C73EF2.jpeg",
    "price": 228.45,
    "category": "Seascape Photography"
  },
  {
    "id": 61,
    "name": "A Sunset At The Pier & A Lighthouse By The Sea",
     
    "year": "2025",
    "description": "A a sunset at the pier with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/34085F8E-5836-4C27-B6F3-E5820F484638.jpeg",
    "price": 263.75,
    "category": "Seascape Photography"
  },
  {
    "id": 62,
    "name": "Snowy Mountains & Geometric Abstract Shapes",
     
    "year": "2018",
    "description": "A snowy mountains with geometric abstract shapes, rendered as aerial photography.",
    "image": "/new_paintings/D195CEBF-134B-43F6-9935-559D14AAE4DE.jpeg",
    "price": 205.12,
    "category": "Aerial Photography"
  },
  {
    "id": 63,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2023",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/FDA05ECC-0265-4A17-A00C-1F8164B8A959.jpeg",
    "price": 216.14,
    "category": "Nature Photography"
  },
  {
    "id": 64,
    "name": "Dream of A Rainbow Over Hills",
     
    "year": "2019",
    "description": "A a rainbow over hills with a deer in a meadow, rendered as nature photography.",
    "image": "/new_paintings/34605157-A870-45BE-A266-E132BE55B985.jpeg",
    "price": 176.75,
    "category": "Nature Photography"
  },
  {
    "id": 65,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2022",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/7885B060-A5F9-4BB7-BA31-DF7B2B2162E0.jpeg",
    "price": 170.08,
    "category": "Macro Photography"
  },
  {
    "id": 66,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2015",
    "description": "A a foggy forest with a forest pathway, rendered as nature photography.",
    "image": "/new_paintings/836C3EB4-720A-4E40-ABFE-AF63F2C9446F.jpeg",
    "price": 143.62,
    "category": "Nature Photography"
  },
  {
    "id": 67,
    "name": "A Butterfly On Flowers at Wildflowers In A Meadow",
     
    "year": "2023",
    "description": "A a butterfly on flowers with wildflowers in a meadow, rendered as nature photography.",
    "image": "/new_paintings/46401B8A-A1F5-49CB-87DA-F5E1F42DCC5C.jpeg",
    "price": 213.46,
    "category": "Nature Photography"
  },
  {
    "id": 68,
    "name": "A Beach With Gentle Waves in A Sunset At The Pier",
     
    "year": "2023",
    "description": "A a beach with gentle waves with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/940FE342-3F10-4477-914A-0F38D172D55B.jpeg",
    "price": 238.69,
    "category": "Seascape Photography"
  },
  {
    "id": 69,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2020",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/C009A8CD-B997-4174-A998-A80F987C7BB9.jpeg",
    "price": 138.69,
    "category": "Botanical Photography"
  },
  {
    "id": 70,
    "name": "Storm Clouds Over The Ocean A Sunset At The Pier",
     
    "year": "2017",
    "description": "A a sunset at the pier with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/B097CBDE-3BCC-4243-BA77-B30F656A1863.jpeg",
    "price": 189.92,
    "category": "Seascape Photography"
  },
  {
    "id": 71,
    "name": "A Bridge Over A River A Beach With Gentle Waves",
     
    "year": "2018",
    "description": "A a beach with gentle waves with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/ED4F1547-69A8-475C-BE48-460880112095.jpeg",
    "price": 201.25,
    "category": "Seascape Photography"
  },
  {
    "id": 72,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2019",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as impressionist painting.",
    "image": "/new_paintings/FF097805-AED9-4B7F-8E97-C03A8B4B0136.jpeg",
    "price": 284.11,
    "category": "Impressionist Painting"
  },
  {
    "id": 73,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2021",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/AEAC6F94-E946-414F-AAE9-041059C52F12.jpeg",
    "price": 250.98,
    "category": "Landscape Photography"
  },
  {
    "id": 74,
    "name": "Song of A Sunrise Over Mountains",
     
    "year": "2024",
    "description": "A a sunrise over mountains with a calm mountain lake, rendered as aerial photography.",
    "image": "/new_paintings/17540249-F1B5-4EE0-898C-701E85D032DD.jpeg",
    "price": 254.5,
    "category": "Aerial Photography"
  },
  {
    "id": 75,
    "name": "A Sunrise Over Mountains in Snowy Mountains",
     
    "year": "2016",
    "description": "A a sunrise over mountains with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/B7C4C551-DBCA-4601-B67E-8DD9830B4E40.jpeg",
    "price": 153.09,
    "category": "Landscape Photography"
  },
  {
    "id": 76,
    "name": "Whispers of A Beach With Gentle Waves",
     
    "year": "2020",
    "description": "A a beach with gentle waves with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/ED59E484-1801-418F-83AB-B18A725EDDBD.jpeg",
    "price": 275.31,
    "category": "Seascape Photography"
  },
  {
    "id": 77,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2013",
    "description": "A a rainbow over hills with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/D227D929-2B3E-4CC2-9B57-542F06EC1C8E.jpeg",
    "price": 127.65,
    "category": "Nature Photography"
  },
  {
    "id": 78,
    "name": "A River Through A Valley A Rocky Forest Stream",
     
    "year": "2018",
    "description": "A a rocky forest stream with a river through a valley, rendered as nature photography.",
    "image": "/new_paintings/A20D93F6-D286-4477-92B9-73AE99696B9C.jpeg",
    "price": 163.98,
    "category": "Nature Photography"
  },
  {
    "id": 79,
    "name": "Song of A Sunrise Over Mountains",
     
    "year": "2017",
    "description": "A a sunrise over mountains with a calm mountain lake, rendered as landscape photography.",
    "image": "/new_paintings/32F4FD4D-CFF9-4920-9180-7FD3C63BFFD9.jpeg",
    "price": 246.65,
    "category": "Landscape Photography"
  },
  {
    "id": 80,
    "name": "Geometric Abstract Shapes A Glacier And Iceberg",
     
    "year": "2023",
    "description": "A a glacier and iceberg with geometric abstract shapes, rendered as seascape photography.",
    "image": "/new_paintings/B441CEDB-22C5-4DDC-8934-857964CE7233.jpeg",
    "price": 245.25,
    "category": "Seascape Photography"
  },
  {
    "id": 81,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2021",
    "description": "A a sunset at the pier with a wooden boat on a lake, rendered as seascape photography.",
    "image": "/new_paintings/ADF7EB78-C23C-48F1-9260-958AAE7C9AAC.jpeg",
    "price": 220.83,
    "category": "Seascape Photography"
  },
  {
    "id": 82,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2025",
    "description": "A a sunset at the pier with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/E58A06BF-C20E-4B18-BDE1-7CCBDB8B8A59.jpeg",
    "price": 257.76,
    "category": "Seascape Photography"
  },
  {
    "id": 83,
    "name": "Minimalist Color Blocks A Potted Cactus",
     
    "year": "2025",
    "description": "A a potted cactus with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/F5990EA1-104F-49CC-B7D9-40FBA6765EED.jpeg",
    "price": 179.27,
    "category": "Botanical Photography"
  },
  {
    "id": 84,
    "name": "Whispers of Snowy Mountains",
     
    "year": "2015",
    "description": "A snowy mountains with a beach with gentle waves, rendered as minimalist photography.",
    "image": "/new_paintings/F0F9E7E1-65BD-40E4-AEB9-2DF0F9DBDFFD.jpeg",
    "price": 75.26,
    "category": "Minimalist Photography"
  },
  {
    "id": 85,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2014",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/17BCA8E7-A390-48A0-95AC-3F4E1C4F7AC3.jpeg",
    "price": 134.71,
    "category": "Landscape Photography"
  },
  {
    "id": 86,
    "name": "Storm Clouds Over The Ocean A Sunset At The Pier",
     
    "year": "2023",
    "description": "A a sunset at the pier with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/B1373C40-CBA6-4E47-B04C-3AAB89B946AC.jpeg",
    "price": 240.43,
    "category": "Seascape Photography"
  },
  {
    "id": 87,
    "name": "Dream of A Potted Cactus",
     
    "year": "2016",
    "description": "A a potted cactus with a desert with sand dunes, rendered as botanical photography.",
    "image": "/new_paintings/8DC54264-9791-4523-BBBC-2A83B61862EE.jpeg",
    "price": 188.65,
    "category": "Botanical Photography"
  },
  {
    "id": 88,
    "name": "Serenity: A Rocky Forest Stream",
     
    "year": "2014",
    "description": "A a rocky forest stream with a tiger in the jungle, rendered as nature photography.",
    "image": "/new_paintings/56CACB75-3365-469D-9FBF-910027EE6798.jpeg",
    "price": 135.19,
    "category": "Nature Photography"
  },
  {
    "id": 89,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2024",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/DFD05252-473D-4A83-B0DB-1151506D6E45.jpeg",
    "price": 220.38,
    "category": "Landscape Photography"
  },
  {
    "id": 90,
    "name": "A Bridge Over A River & A Wooden Boat On A Lake",
     
    "year": "2016",
    "description": "A a bridge over a river with a wooden boat on a lake, rendered as seascape photography.",
    "image": "/new_paintings/3C469911-EE54-4BDC-9F90-877A0DDF5AC5.jpeg",
    "price": 184.44,
    "category": "Seascape Photography"
  },
  {
    "id": 91,
    "name": "Dream of Autumn Foliage",
     
    "year": "2023",
    "description": "A autumn foliage with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/21026C49-019C-483E-8102-FF93D1FF08AF.jpeg",
    "price": 214.42,
    "category": "Landscape Photography"
  },
  {
    "id": 92,
    "name": "A Sunrise Over Mountains Storm Clouds Over The Ocean",
     
    "year": "2017",
    "description": "A storm clouds over the ocean with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/319364F1-2F98-4E9D-A794-735D62EEE46F.jpeg",
    "price": 161.59,
    "category": "Landscape Photography"
  },
  {
    "id": 93,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2015",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as macro photography.",
    "image": "/new_paintings/233E56C4-3962-421D-A6A5-285F6DC680FA.jpeg",
    "price": 117.53,
    "category": "Macro Photography"
  },
  {
    "id": 94,
    "name": "Dream of Autumn Foliage",
     
    "year": "2016",
    "description": "A autumn foliage with minimalist color blocks, rendered as landscape photography.",
    "image": "/new_paintings/539FCE5E-1F6A-4934-85C4-727BDC8D9FBD.jpeg",
    "price": 152.27,
    "category": "Landscape Photography"
  },
  {
    "id": 95,
    "name": "A Sunrise Over Mountains in Snowy Mountains",
     
    "year": "2017",
    "description": "A a sunrise over mountains with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/E87CC292-DDD4-43B7-A2DC-3D569B463320.jpeg",
    "price": 162.09,
    "category": "Landscape Photography"
  },
  {
    "id": 96,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2013",
    "description": "A a sunset at the pier with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/CCCA9C54-8F85-4A95-ADED-B1A320F1BECA.jpeg",
    "price": 155.07,
    "category": "Seascape Photography"
  },
  {
    "id": 97,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2016",
    "description": "A a rainbow over hills with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/5FE9A9DF-30E6-4C27-8A29-B60F3DDB3AC7.jpeg",
    "price": 151.21,
    "category": "Landscape Photography"
  },
  {
    "id": 98,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2024",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/E781A3FF-9368-417C-BA85-084F0CDC10F5.jpeg",
    "price": 252.3,
    "category": "Seascape Photography"
  },
  {
    "id": 99,
    "name": "Song of A Calm Mountain Lake",
     
    "year": "2016",
    "description": "A a calm mountain lake with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/7363937B-A6CF-4CEC-9770-889CB8BCEB4C.jpeg",
    "price": 184.76,
    "category": "Seascape Photography"
  },
  {
    "id": 100,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2016",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/1138CF08-9CB9-4C5F-9298-DEEA130BD7F3.jpeg",
    "price": 150.52,
    "category": "Landscape Photography"
  },
  {
    "id": 101,
    "name": "Echoes of A Forest Pathway",
     
    "year": "2014",
    "description": "A a forest pathway with a rocky forest stream, rendered as landscape photography.",
    "image": "/new_paintings/E6E290A9-300C-4390-B0B9-6F0847841F93.jpeg",
    "price": 133.52,
    "category": "Landscape Photography"
  },
  {
    "id": 102,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2018",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/75183461-24A5-4997-96A7-F40232833914.jpeg",
    "price": 291.4,
    "category": "Aerial Photography"
  },
  {
    "id": 103,
    "name": "Autumn Foliage Wildflowers In A Meadow",
     
    "year": "2022",
    "description": "A wildflowers in a meadow with autumn foliage, rendered as botanical photography.",
    "image": "/new_paintings/5BADF43F-5FC3-49FE-8049-58B5E57CB224.jpeg",
    "price": 154.38,
    "category": "Botanical Photography"
  },
  {
    "id": 104,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2013",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/3984F2A0-4EBA-4924-BDEA-65FDE9690CFA.jpeg",
    "price": 150.08,
    "category": "Seascape Photography"
  },
  {
    "id": 105,
    "name": "Poem of Wildflowers In A Meadow",
     
    "year": "2023",
    "description": "A wildflowers in a meadow with a deer in a meadow, rendered as impressionist painting.",
    "image": "/new_paintings/5BA3FFA7-7C8A-4531-A55A-9DB65A26071D.jpeg",
    "price": 343.83,
    "category": "Impressionist Painting"
  },
  {
    "id": 106,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2025",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/2C5BF4D1-55BB-4588-A88E-9B77D326DD69.jpeg",
    "price": 173.74,
    "category": "Botanical Photography"
  },
  {
    "id": 107,
    "name": "Serenity: A Calm Mountain Lake",
     
    "year": "2017",
    "description": "A a calm mountain lake with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/636A56BD-52F7-487D-B6D8-90AD6F88E306.jpeg",
    "price": 186.27,
    "category": "Seascape Photography"
  },
  {
    "id": 108,
    "name": "A Potted Cactus & Wildflowers In A Meadow",
     
    "year": "2023",
    "description": "A a potted cactus with wildflowers in a meadow, rendered as botanical photography.",
    "image": "/new_paintings/D0F7682F-0AAC-4737-BD68-ACCF8634C9F8.jpeg",
    "price": 163.96,
    "category": "Botanical Photography"
  },
  {
    "id": 109,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2016",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/1C92D598-60E3-4837-9497-67DFF24DB0D3.jpeg",
    "price": 179.62,
    "category": "Seascape Photography"
  },
  {
    "id": 110,
    "name": "Whispers of A Rainbow Over Hills",
     
    "year": "2014",
    "description": "A a rainbow over hills with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/72DD2D02-844E-4BED-9803-E8B9285A90CA.jpeg",
    "price": 162.48,
    "category": "Seascape Photography"
  },
  {
    "id": 111,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2017",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/BCF349A7-8797-4B47-AD7B-8AC8B269E2F9.jpeg",
    "price": 266.26,
    "category": "Seascape Photography"
  },
  {
    "id": 112,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2022",
    "description": "A a sunset at the pier with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/7E5C16F9-BBAF-48E7-9B86-862ADABEF9CD.jpeg",
    "price": 233.6,
    "category": "Seascape Photography"
  },
  {
    "id": 113,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2015",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as nature photography.",
    "image": "/new_paintings/23E21C28-4402-4451-A651-30739870AAAF.jpeg",
    "price": 145.32,
    "category": "Nature Photography"
  },
  {
    "id": 114,
    "name": "Storm Clouds Over The Ocean A Sunset At The Pier",
     
    "year": "2020",
    "description": "A a sunset at the pier with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/37751BEF-22D1-4ABA-9EF7-2BA4D78E77D7.jpeg",
    "price": 217.19,
    "category": "Seascape Photography"
  },
  {
    "id": 115,
    "name": "Quiet Snowy Mountains",
     
    "year": "2016",
    "description": "A snowy mountains with a sunrise over mountains, rendered as aerial photography.",
    "image": "/new_paintings/93DD5EDE-A29C-42C4-A425-89515BCAF672.jpeg",
    "price": 185.79,
    "category": "Aerial Photography"
  },
  {
    "id": 116,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2024",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/8EB0C9D7-2A65-4FB7-A016-D7F0D72A3993.jpeg",
    "price": 247.7,
    "category": "Seascape Photography"
  },
  {
    "id": 117,
    "name": "Poem of A Wooden Boat On A Lake",
     
    "year": "2018",
    "description": "A a wooden boat on a lake with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/BC215D16-C718-44C4-882E-D77F01459FF9.jpeg",
    "price": 202.16,
    "category": "Seascape Photography"
  },
  {
    "id": 118,
    "name": "Poem of A Wooden Boat On A Lake",
     
    "year": "2013",
    "description": "A a wooden boat on a lake with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/8E3E7A2B-0720-466E-BCDF-D986E20EC6AB.jpeg",
    "price": 152.31,
    "category": "Seascape Photography"
  },
  {
    "id": 119,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2013",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as still life photography.",
    "image": "/new_paintings/DA9EF1F5-B6DE-4636-94A3-48E9AD1827C4.jpeg",
    "price": 84.43,
    "category": "Still Life Photography"
  },
  {
    "id": 120,
    "name": "A Sunset At The Pier A Calm Mountain Lake",
     
    "year": "2022",
    "description": "A a calm mountain lake with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/88D8D435-C89D-49A6-9874-2921868EEAAB.jpeg",
    "price": 233.23,
    "category": "Seascape Photography"
  },
  {
    "id": 121,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2018",
    "description": "A a foggy forest with a forest pathway, rendered as night photography.",
    "image": "/new_paintings/373C2667-713E-467D-A225-0CABE8CE7F90.jpeg",
    "price": 171.39,
    "category": "Night Photography"
  },
  {
    "id": 122,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2018",
    "description": "A a sunset at the pier with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/486A7AD1-AFB1-48DD-A75A-AFD60A5C4564.jpeg",
    "price": 197.84,
    "category": "Seascape Photography"
  },
  {
    "id": 123,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2017",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/3E917659-B4C0-42B4-9C3C-ED188396DD67.jpeg",
    "price": 156.8,
    "category": "Landscape Photography"
  },
  {
    "id": 124,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2021",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as watercolor painting.",
    "image": "/new_paintings/C908005B-79E7-413D-B6B2-A05E21B4B19B.jpeg",
    "price": 226.52,
    "category": "Watercolor Painting"
  },
  {
    "id": 125,
    "name": "Quiet A Ceramic Vase On A Table",
     
    "year": "2024",
    "description": "A a ceramic vase on a table with fluid paint swirls, rendered as macro photography.",
    "image": "/new_paintings/F6B8DF28-435E-4A0F-81FC-D7398E886AE2.jpeg",
    "price": 186.02,
    "category": "Macro Photography"
  },
  {
    "id": 126,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2015",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/715A19CC-91DB-4BC5-AF5F-6CE6BA7932A8.jpeg",
    "price": 273.06,
    "category": "Seascape Photography"
  },
  {
    "id": 127,
    "name": "Serenity: A Glacier And Iceberg",
     
    "year": "2013",
    "description": "A a glacier and iceberg with a whale in the ocean, rendered as seascape photography.",
    "image": "/new_paintings/34BCBB86-F941-4708-91F6-D79F85B5EF8D.jpeg",
    "price": 150.62,
    "category": "Seascape Photography"
  },
  {
    "id": 128,
    "name": "Geometric Abstract Shapes Storm Clouds Over The Ocean",
     
    "year": "2018",
    "description": "A storm clouds over the ocean with geometric abstract shapes, rendered as nature photography.",
    "image": "/new_paintings/7A0E0135-2AC5-4F4A-B748-CC6AC85D71C3.jpeg",
    "price": 166.11,
    "category": "Nature Photography"
  },
  {
    "id": 129,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2021",
    "description": "A a potted cactus with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/BDCBD63D-560F-4EEC-B6E4-1E4C54C9F28E.jpeg",
    "price": 162.18,
    "category": "Macro Photography"
  },
  {
    "id": 130,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2020",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/4E7627E3-CADD-4307-B394-248F2DBBA846.jpeg",
    "price": 216.27,
    "category": "Seascape Photography"
  },
  {
    "id": 131,
    "name": "Quiet A Sunrise Over Mountains",
     
    "year": "2013",
    "description": "A a sunrise over mountains with storm clouds over the ocean, rendered as aerial photography.",
    "image": "/new_paintings/5C4657A7-4C0E-4DEF-AEEA-457A8535B931.jpeg",
    "price": 153.12,
    "category": "Aerial Photography"
  },
  {
    "id": 132,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2022",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/4C5A221D-1DC7-453C-B0E4-169739A619F0.jpeg",
    "price": 234.48,
    "category": "Seascape Photography"
  },
  {
    "id": 133,
    "name": "Echoes of A Forest Pathway",
     
    "year": "2020",
    "description": "A a forest pathway with a rocky forest stream, rendered as landscape photography.",
    "image": "/new_paintings/DA805E27-6DDF-4E81-B95F-968C4260CC56.jpeg",
    "price": 251.83,
    "category": "Landscape Photography"
  },
  {
    "id": 134,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2023",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/7A6D743B-30C2-4A35-84F6-FE48E55EB6D7.jpeg",
    "price": 252.09,
    "category": "Aerial Photography"
  },
  {
    "id": 135,
    "name": "Dream of A Forest Pathway",
     
    "year": "2016",
    "description": "A a forest pathway with autumn foliage, rendered as landscape photography.",
    "image": "/new_paintings/A2B64927-3607-4A1A-87FD-A72DCBB7A6F6.jpeg",
    "price": 148.56,
    "category": "Landscape Photography"
  },
  {
    "id": 136,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2014",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/5C2E58B8-B874-431B-A266-2569ECFF0D5C.jpeg",
    "price": 134.72,
    "category": "Landscape Photography"
  },
  {
    "id": 137,
    "name": "Seashells In A Basket in A Ceramic Vase On A Table",
     
    "year": "2013",
    "description": "A seashells in a basket with a ceramic vase on a table, rendered as still life photography.",
    "image": "/new_paintings/0FC41BC0-F0ED-46D5-9DEC-65D9899FB6E6.jpeg",
    "price": 85.37,
    "category": "Still Life Photography"
  },
  {
    "id": 138,
    "name": "A Calm Mountain Lake Storm Clouds Over The Ocean",
     
    "year": "2022",
    "description": "A storm clouds over the ocean with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/F1CE28BF-BF06-4F13-A00B-E84A73EC3596.jpeg",
    "price": 236.82,
    "category": "Seascape Photography"
  },
  {
    "id": 139,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2017",
    "description": "A a rainbow over hills with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/50715B7A-0815-48AF-8444-7E887ACD185F.jpeg",
    "price": 161.39,
    "category": "Landscape Photography"
  },
  {
    "id": 140,
    "name": "Poem of Wildflowers In A Meadow",
     
    "year": "2025",
    "description": "A wildflowers in a meadow with a deer in a meadow, rendered as impressionist painting.",
    "image": "/new_paintings/2E68E480-7BAD-4DD0-B5AD-1DC9370F3D0B.jpeg",
    "price": 361.71,
    "category": "Impressionist Painting"
  },
  {
    "id": 141,
    "name": "Dream of A Sunrise Over Mountains",
     
    "year": "2021",
    "description": "A a sunrise over mountains with a potted cactus, rendered as nature photography.",
    "image": "/new_paintings/99AA1B52-1488-4ECE-B8C7-714273AD8DCD.jpeg",
    "price": 197.17,
    "category": "Nature Photography"
  },
  {
    "id": 142,
    "name": "Quiet Snowy Mountains",
     
    "year": "2023",
    "description": "A snowy mountains with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/361BB848-95D7-4CDD-9A14-96D36FA93023.jpeg",
    "price": 214.56,
    "category": "Landscape Photography"
  },
  {
    "id": 143,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2013",
    "description": "A a foggy forest with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/62FFF1F2-58DC-4729-8CAD-612324FA2BC0.jpeg",
    "price": 238.82,
    "category": "Landscape Photography"
  },
  {
    "id": 144,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2020",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/14586F94-7709-4237-B42E-68A75AAE655C.jpeg",
    "price": 144.54,
    "category": "Botanical Photography"
  },
  {
    "id": 145,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2017",
    "description": "A a sunset at the pier with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/75ABF4FB-0EC1-4FD1-8657-C7E0A4392268.jpeg",
    "price": 193.3,
    "category": "Seascape Photography"
  },
  {
    "id": 146,
    "name": "Song of A Calm Mountain Lake",
     
    "year": "2024",
    "description": "A a calm mountain lake with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/B1FCF898-F2E5-4B75-BC9B-64E9A0511A5B.jpeg",
    "price": 219.42,
    "category": "Landscape Photography"
  },
  {
    "id": 147,
    "name": "Serenity: A Foggy Forest",
     
    "year": "2013",
    "description": "A a foggy forest with a forest pathway, rendered as black and white photography.",
    "image": "/new_paintings/4FE6EB86-C4AA-4367-B6D9-B39DF7E6CCB1.jpeg",
    "price": 112.77,
    "category": "Black and White Photography"
  },
  {
    "id": 148,
    "name": "Poem of A Potted Cactus",
     
    "year": "2020",
    "description": "A a potted cactus with a ceramic vase on a table, rendered as botanical photography.",
    "image": "/new_paintings/B1446BE0-FDC2-45B4-9DA4-E2CB0CEED4DE.jpeg",
    "price": 141.94,
    "category": "Botanical Photography"
  },
  {
    "id": 149,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2025",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as nature photography.",
    "image": "/new_paintings/BACFD068-6C47-4C86-9C82-0973AE2884E3.jpeg",
    "price": 231.77,
    "category": "Nature Photography"
  },
  {
    "id": 150,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2013",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/258F4F80-A915-4451-86F0-B4BC059328A5.jpeg",
    "price": 127.89,
    "category": "Nature Photography"
  },
  {
    "id": 151,
    "name": "Song of A Beach With Gentle Waves",
     
    "year": "2025",
    "description": "A a beach with gentle waves with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/3D3F56CC-E856-42F6-A5B3-C50C638DB5AF.jpeg",
    "price": 278.39,
    "category": "Seascape Photography"
  },
  {
    "id": 152,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2015",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as macro photography.",
    "image": "/new_paintings/46342A4D-6223-46FB-86AA-6703F4395F8F.jpeg",
    "price": 118.58,
    "category": "Macro Photography"
  },
  {
    "id": 153,
    "name": "Under Minimalist Color Blocks: A Beach With Gentle Waves",
     
    "year": "2023",
    "description": "A a beach with gentle waves with minimalist color blocks, rendered as seascape photography.",
    "image": "/new_paintings/84AB3CA0-AB9C-4203-9853-A830F4A7F59C.jpeg",
    "price": 238.04,
    "category": "Seascape Photography"
  },
  {
    "id": 154,
    "name": "A Rainbow Over Hills Storm Clouds Over The Ocean",
     
    "year": "2016",
    "description": "A storm clouds over the ocean with a rainbow over hills, rendered as nature photography.",
    "image": "/new_paintings/4DD0B0F7-F58B-4717-9000-16E05AE9D6B9.jpeg",
    "price": 149.6,
    "category": "Nature Photography"
  },
  {
    "id": 155,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2017",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/BC944BD3-956C-4815-8137-E64D298FB6FE.jpeg",
    "price": 122.86,
    "category": "Botanical Photography"
  },
  {
    "id": 156,
    "name": "Serenity: A Rocky Forest Stream",
     
    "year": "2014",
    "description": "A a rocky forest stream with a tiger in the jungle, rendered as nature photography.",
    "image": "/new_paintings/1283FB6C-B233-4693-959B-5119649F6D57.jpeg",
    "price": 131.63,
    "category": "Nature Photography"
  },
  {
    "id": 157,
    "name": "A Sunset At The Pier & A Lighthouse By The Sea",
     
    "year": "2024",
    "description": "A a sunset at the pier with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/0741FF1E-088B-4D41-84B3-6C5B03F49037.jpeg",
    "price": 251.06,
    "category": "Seascape Photography"
  },
  {
    "id": 158,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2016",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as impressionist painting.",
    "image": "/new_paintings/1A517083-FE7F-479F-9FA3-D41847EF1E01.jpeg",
    "price": 225.83,
    "category": "Impressionist Painting"
  },
  {
    "id": 159,
    "name": "A River Through A Valley A Rocky Forest Stream",
     
    "year": "2024",
    "description": "A a rocky forest stream with a river through a valley, rendered as landscape photography.",
    "image": "/new_paintings/1E175F97-2760-419E-BDBE-1BC75989F287.jpeg",
    "price": 220.07,
    "category": "Landscape Photography"
  },
  {
    "id": 160,
    "name": "Dream of A Wooden Boat On A Lake",
     
    "year": "2023",
    "description": "A a wooden boat on a lake with a sunset at the pier, rendered as black and white photography.",
    "image": "/new_paintings/D98C7CF0-EECB-4138-82BF-4345DAD05B60.jpeg",
    "price": 189.92,
    "category": "Black and White Photography"
  },
  {
    "id": 161,
    "name": "A Potted Cactus & A Bicycle By A Wall",
     
    "year": "2017",
    "description": "A a potted cactus with a bicycle by a wall, rendered as botanical photography.",
    "image": "/new_paintings/C9F65FF2-8667-430E-855E-C15EB786F309.jpeg",
    "price": 197.86,
    "category": "Botanical Photography"
  },
  {
    "id": 162,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2015",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as seascape photography.",
    "image": "/new_paintings/361B694A-A4F6-4033-9D9B-B40526155373.jpeg",
    "price": 173.01,
    "category": "Seascape Photography"
  },
  {
    "id": 163,
    "name": "A Potted Cactus at A Peacock With Feathers Spread",
     
    "year": "2023",
    "description": "A a potted cactus with a peacock with feathers spread, rendered as botanical photography.",
    "image": "/new_paintings/89161CC9-0A48-4BD2-AD9A-4029352E6BAC.jpeg",
    "price": 160.22,
    "category": "Botanical Photography"
  },
  {
    "id": 164,
    "name": "A Desert With Sand Dunes A Beach With Gentle Waves",
     
    "year": "2014",
    "description": "A a beach with gentle waves with a desert with sand dunes, rendered as seascape photography.",
    "image": "/new_paintings/29321CD2-162F-42CD-AA83-19F50EA7171B.jpeg",
    "price": 167.26,
    "category": "Seascape Photography"
  },
  {
    "id": 165,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2013",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/50E5C741-9BB8-45D5-89F4-A2189173EA58.jpeg",
    "price": 156.14,
    "category": "Seascape Photography"
  },
  {
    "id": 166,
    "name": "Whispers of A Beach With Gentle Waves",
     
    "year": "2021",
    "description": "A a beach with gentle waves with seashells in a basket, rendered as seascape photography.",
    "image": "/new_paintings/DE00CADD-F41C-4A56-8B64-B5FD4711F2D0.jpeg",
    "price": 225.3,
    "category": "Seascape Photography"
  },
  {
    "id": 167,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2013",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/C77146B1-1541-4E42-A04C-59C841690DA2.jpeg",
    "price": 93.91,
    "category": "Botanical Photography"
  },
  {
    "id": 168,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2014",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/C4079FC6-0E35-46F8-A584-EC93E8D4593D.jpeg",
    "price": 166.62,
    "category": "Seascape Photography"
  },
  {
    "id": 169,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2017",
    "description": "A a glacier and iceberg with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/A4323E35-33CC-4051-9C04-8D8CC5C1EDC4.jpeg",
    "price": 161.98,
    "category": "Landscape Photography"
  },
  {
    "id": 170,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2025",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/6AB9A324-F094-4866-B5D1-5076AFA5CE9C.jpeg",
    "price": 227.74,
    "category": "Landscape Photography"
  },
  {
    "id": 171,
    "name": "Song of A Beach With Gentle Waves",
     
    "year": "2024",
    "description": "A a beach with gentle waves with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/5027FDF5-0118-4325-BC70-61A87FC59B7C.jpeg",
    "price": 251.93,
    "category": "Seascape Photography"
  },
  {
    "id": 172,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2018",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/D09DC054-FABC-4CC7-A0AF-99085154A9F7.jpeg",
    "price": 168.91,
    "category": "Nature Photography"
  },
  {
    "id": 173,
    "name": "A Foggy Forest at A Deer In A Meadow",
     
    "year": "2020",
    "description": "A a foggy forest with a deer in a meadow, rendered as landscape photography.",
    "image": "/new_paintings/FD7E14AE-80C9-4574-97EE-1EAB7B6612EF.jpeg",
    "price": 186.81,
    "category": "Landscape Photography"
  },
  {
    "id": 174,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2017",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/AD6E017E-9223-4859-A7F2-7DB7C855D840.jpeg",
    "price": 157.26,
    "category": "Nature Photography"
  },
  {
    "id": 175,
    "name": "A Calm Mountain Lake Storm Clouds Over The Ocean",
     
    "year": "2015",
    "description": "A storm clouds over the ocean with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/4E3CD482-4D41-4B0F-9F88-EA5F86F80B49.jpeg",
    "price": 169.6,
    "category": "Seascape Photography"
  },
  {
    "id": 176,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2021",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/D97713FC-BC63-4D59-BC41-2AC58BCC8D38.jpeg",
    "price": 224.78,
    "category": "Seascape Photography"
  },
  {
    "id": 177,
    "name": "Quiet Snowy Mountains",
     
    "year": "2020",
    "description": "A snowy mountains with minimalist color blocks, rendered as minimalist photography.",
    "image": "/new_paintings/2D5F6CA2-7090-4175-A958-1A18EEB8BB4E.jpeg",
    "price": 99.59,
    "category": "Minimalist Photography"
  },
  {
    "id": 178,
    "name": "Song of A Sunrise Over Mountains",
     
    "year": "2016",
    "description": "A a sunrise over mountains with a calm mountain lake, rendered as landscape photography.",
    "image": "/new_paintings/0185A801-AE20-446B-A4B5-F06BCAD30670.jpeg",
    "price": 146.86,
    "category": "Landscape Photography"
  },
  {
    "id": 179,
    "name": "Serenity: A Rainbow Over Hills",
     
    "year": "2016",
    "description": "A a rainbow over hills with storm clouds over the ocean, rendered as seascape photography.",
    "image": "/new_paintings/5045C536-DF79-4334-A236-BAC528A13DAE.jpeg",
    "price": 184.94,
    "category": "Seascape Photography"
  },
  {
    "id": 180,
    "name": "Quiet Snowy Mountains",
     
    "year": "2016",
    "description": "A snowy mountains with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/EB93644C-4298-45AB-8D7B-18F2FE03B002.jpeg",
    "price": 153.77,
    "category": "Landscape Photography"
  },
  {
    "id": 181,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2020",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/22544158-5669-4208-8222-23EB05741DDD.jpeg",
    "price": 217.72,
    "category": "Seascape Photography"
  },
  {
    "id": 182,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2015",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/30C8C6D6-51F2-4577-B5E4-1A386F3687DC.jpeg",
    "price": 139.87,
    "category": "Nature Photography"
  },
  {
    "id": 183,
    "name": "Echoes of A Calm Mountain Lake",
     
    "year": "2022",
    "description": "A a calm mountain lake with a lotus pond, rendered as landscape photography.",
    "image": "/new_paintings/7E164DAC-4651-4C48-AC76-6B2863CE54CE.jpeg",
    "price": 204.16,
    "category": "Landscape Photography"
  },
  {
    "id": 184,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2019",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as landscape photography.",
    "image": "/new_paintings/E647BBD1-D0FF-401B-8825-52D80FB51957.jpeg",
    "price": 178.74,
    "category": "Landscape Photography"
  },
  {
    "id": 185,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2020",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/504DB718-41C9-43C6-BFC9-27C191B0BCF6.jpeg",
    "price": 144.55,
    "category": "Botanical Photography"
  },
  {
    "id": 186,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2021",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/5D167010-0359-4D48-BF0E-73E9D2DF08D6.jpeg",
    "price": 228.38,
    "category": "Aerial Photography"
  },
  {
    "id": 187,
    "name": "Poem of An Elephant In The Savanna",
     
    "year": "2021",
    "description": "A an elephant in the savanna with a forest pathway, rendered as minimalist photography.",
    "image": "/new_paintings/02628021-637E-4C9B-BD6C-06DAB6111778.jpeg",
    "price": 108.55,
    "category": "Minimalist Photography"
  },
  {
    "id": 188,
    "name": "Dream of A Potted Cactus",
     
    "year": "2016",
    "description": "A a potted cactus with a desert with sand dunes, rendered as botanical photography.",
    "image": "/new_paintings/C6DA42A7-61F1-48EC-8800-6D14DBFF504B.jpeg",
    "price": 114.21,
    "category": "Botanical Photography"
  },
  {
    "id": 189,
    "name": "A River Through A Valley A Rocky Forest Stream",
     
    "year": "2025",
    "description": "A a rocky forest stream with a river through a valley, rendered as landscape photography.",
    "image": "/new_paintings/92F0CA50-09E2-420D-ACD5-5B2A74CE2DD4.jpeg",
    "price": 229.9,
    "category": "Landscape Photography"
  },
  {
    "id": 190,
    "name": "Dream of A Rocky Forest Stream",
     
    "year": "2024",
    "description": "A a rocky forest stream with a waterfall in a canyon, rendered as landscape photography.",
    "image": "/new_paintings/2AD0334C-660C-4BAB-8C71-5903E2FC69D6.jpeg",
    "price": 221.56,
    "category": "Landscape Photography"
  },
  {
    "id": 191,
    "name": "Geometric Abstract Shapes Storm Clouds Over The Ocean",
     
    "year": "2016",
    "description": "A storm clouds over the ocean with geometric abstract shapes, rendered as minimalist photography.",
    "image": "/new_paintings/AF961DB8-6409-486B-881D-47D6420D40D0.jpeg",
    "price": 79.01,
    "category": "Minimalist Photography"
  },
  {
    "id": 192,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2013",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/62380C72-88F1-44C0-820E-058F54632442.jpeg",
    "price": 90.82,
    "category": "Botanical Photography"
  },
  {
    "id": 193,
    "name": "Autumn Foliage Wildflowers In A Meadow",
     
    "year": "2013",
    "description": "A wildflowers in a meadow with autumn foliage, rendered as botanical photography.",
    "image": "/new_paintings/2704C672-F2CA-4707-B4A6-63B475ABAB42.jpeg",
    "price": 96.57,
    "category": "Botanical Photography"
  },
  {
    "id": 194,
    "name": "Whispers of A Glacier And Iceberg",
     
    "year": "2021",
    "description": "A a glacier and iceberg with a rocky forest stream, rendered as nature photography.",
    "image": "/new_paintings/C0917ED2-96D7-4FDB-92F7-38E9C831EE40.jpeg",
    "price": 190.29,
    "category": "Nature Photography"
  },
  {
    "id": 195,
    "name": "A Bridge Over A River A Beach With Gentle Waves",
     
    "year": "2024",
    "description": "A a beach with gentle waves with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/1481A125-E887-4B04-8195-925936304EEB.jpeg",
    "price": 276.77,
    "category": "Seascape Photography"
  },
  {
    "id": 196,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2022",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/3A286795-0C40-4D0D-ABBE-00D382FB3924.jpeg",
    "price": 167.64,
    "category": "Macro Photography"
  },
  {
    "id": 197,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2021",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/4FFA2A25-D971-419C-83EB-77CEBE8B2D2D.jpeg",
    "price": 190.84,
    "category": "Landscape Photography"
  },
  {
    "id": 198,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2016",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/37DB45B6-9D75-42BE-B14B-9E4F93A3C0C2.jpeg",
    "price": 182.97,
    "category": "Seascape Photography"
  },
  {
    "id": 199,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2019",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/1A382E00-BCA9-4CDC-B846-FBC6884C6144.jpeg",
    "price": 210.43,
    "category": "Seascape Photography"
  },
  {
    "id": 200,
    "name": "Serenity: Minimalist Color Blocks",
     
    "year": "2013",
    "description": "A minimalist color blocks with geometric abstract shapes, rendered as minimalist photography.",
    "image": "/new_paintings/6BEB4786-62F3-4661-97C0-B7A20829A5E5.jpeg",
    "price": 64.86,
    "category": "Minimalist Photography"
  },
  {
    "id": 201,
    "name": "Song of Snowy Mountains",
     
    "year": "2015",
    "description": "A snowy mountains with a calm mountain lake, rendered as aerial photography.",
    "image": "/new_paintings/C56C932E-8AC8-4DEE-8DCD-3A309D07842F.jpeg",
    "price": 175.33,
    "category": "Aerial Photography"
  },
  {
    "id": 202,
    "name": "Autumn Foliage A Calm Mountain Lake",
     
    "year": "2015",
    "description": "A a calm mountain lake with autumn foliage, rendered as landscape photography.",
    "image": "/new_paintings/C49E6F3A-73D1-497C-80B7-9D53EF57C143.jpeg",
    "price": 143.84,
    "category": "Landscape Photography"
  },
  {
    "id": 203,
    "name": "Dream of Minimalist Color Blocks",
     
    "year": "2015",
    "description": "A minimalist color blocks with a forest pathway, rendered as landscape photography.",
    "image": "/new_paintings/67E3288D-FF65-4C68-99CD-46293DFCA2D3.jpeg",
    "price": 141.16,
    "category": "Landscape Photography"
  },
  {
    "id": 204,
    "name": "Quiet A Sunrise Over Mountains",
     
    "year": "2019",
    "description": "A a sunrise over mountains with a desert with sand dunes, rendered as landscape photography.",
    "image": "/new_paintings/850511DA-B98A-4A93-BC64-296DB6CA1338.jpeg",
    "price": 175.4,
    "category": "Landscape Photography"
  },
  {
    "id": 205,
    "name": "Poem of A Bridge Over A River",
     
    "year": "2022",
    "description": "A a bridge over a river with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/584A3A0F-8293-4023-8F79-E00ACA075D93.jpeg",
    "price": 235.47,
    "category": "Seascape Photography"
  },
  {
    "id": 206,
    "name": "Serenity: Autumn Foliage",
     
    "year": "2014",
    "description": "A autumn foliage with a forest pathway, rendered as impressionist painting.",
    "image": "/new_paintings/70ABF382-5029-49BB-833B-2C9753B0845E.jpeg",
    "price": 207.39,
    "category": "Impressionist Painting"
  },
  {
    "id": 207,
    "name": "Snowy Mountains & Geometric Abstract Shapes",
     
    "year": "2024",
    "description": "A snowy mountains with geometric abstract shapes, rendered as aerial photography.",
    "image": "/new_paintings/C46424AA-AFB2-4C4A-97F0-555934BF09DA.jpeg",
    "price": 285.59,
    "category": "Aerial Photography"
  },
  {
    "id": 208,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2016",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/113A18BE-1932-4D7C-BFC8-1F7F7D250C12.jpeg",
    "price": 178.82,
    "category": "Seascape Photography"
  },
  {
    "id": 209,
    "name": "Poem of A Potted Cactus",
     
    "year": "2013",
    "description": "A a potted cactus with a ceramic vase on a table, rendered as still life photography.",
    "image": "/new_paintings/A4A155C7-D0F0-4D1F-8677-52C23C99868C.jpeg",
    "price": 81.98,
    "category": "Still Life Photography"
  },
  {
    "id": 210,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2020",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/54261A86-A77B-4071-A859-9FF4547DDDB5.jpeg",
    "price": 198.4,
    "category": "Botanical Photography"
  },
  {
    "id": 211,
    "name": "Whispers of A Beach With Gentle Waves",
     
    "year": "2021",
    "description": "A a beach with gentle waves with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/A43531B3-E81B-424E-94C9-BEABB10E22B9.jpeg",
    "price": 273.11,
    "category": "Seascape Photography"
  },
  {
    "id": 212,
    "name": "Whispers of A Sunrise Over Mountains",
     
    "year": "2019",
    "description": "A a sunrise over mountains with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/4E689C68-F530-4CDE-8D09-75F9EDA4D5AB.jpeg",
    "price": 175.77,
    "category": "Landscape Photography"
  },
  {
    "id": 213,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2022",
    "description": "A a forest pathway with a foggy forest, rendered as black and white photography.",
    "image": "/new_paintings/7BA05098-09C6-42D6-9F7E-3F62C3B42393.jpeg",
    "price": 229.44,
    "category": "Black and White Photography"
  },
  {
    "id": 214,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2015",
    "description": "A a rainbow over hills with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/80269758-30B6-4F09-A1D8-3EEDB64CB783.jpeg",
    "price": 140.61,
    "category": "Nature Photography"
  },
  {
    "id": 215,
    "name": "A Rainbow Over Hills & A Calm Mountain Lake",
     
    "year": "2019",
    "description": "A a rainbow over hills with a calm mountain lake, rendered as nature photography.",
    "image": "/new_paintings/79F9754C-824B-4271-9E88-8463B3248681.jpeg",
    "price": 175.28,
    "category": "Nature Photography"
  },
  {
    "id": 216,
    "name": "Autumn Foliage Wildflowers In A Meadow",
     
    "year": "2018",
    "description": "A wildflowers in a meadow with autumn foliage, rendered as botanical photography.",
    "image": "/new_paintings/79192C8B-1BDF-4301-91F9-F925D6CC66B8.jpeg",
    "price": 127.91,
    "category": "Botanical Photography"
  },
  {
    "id": 217,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2024",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/480BA06E-4551-4D0C-81F7-2E64F97C632B.jpeg",
    "price": 220.51,
    "category": "Landscape Photography"
  },
  {
    "id": 218,
    "name": "A Waterfall In A Canyon in A Sunrise Over Mountains",
     
    "year": "2013",
    "description": "A a waterfall in a canyon with a sunrise over mountains, rendered as landscape photography.",
    "image": "/new_paintings/6EB69B63-A17B-4B26-8EB6-904E8F5CF884.jpeg",
    "price": 123.93,
    "category": "Landscape Photography"
  },
  {
    "id": 219,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2022",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as seascape photography.",
    "image": "/new_paintings/4FDCDD2F-0FBB-4C41-867D-AF6DBF460AEC.jpeg",
    "price": 265.27,
    "category": "Seascape Photography"
  },
  {
    "id": 220,
    "name": "Under Snowy Mountains: A Rainbow Over Hills",
     
    "year": "2023",
    "description": "A a rainbow over hills with snowy mountains, rendered as landscape photography.",
    "image": "/new_paintings/BACA37C8-194C-4FA7-9FB8-1A634B04C9D3.jpeg",
    "price": 211.17,
    "category": "Landscape Photography"
  },
  {
    "id": 221,
    "name": "A Rainbow Over Hills & A Calm Mountain Lake",
     
    "year": "2022",
    "description": "A a rainbow over hills with a calm mountain lake, rendered as nature photography.",
    "image": "/new_paintings/14772612-0709-4EFE-A758-56DAE12F2001.jpeg",
    "price": 198.99,
    "category": "Nature Photography"
  },
  {
    "id": 222,
    "name": "Under Snowy Mountains: A Glacier And Iceberg",
     
    "year": "2022",
    "description": "A a glacier and iceberg with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/3EA4D208-177D-46CE-AE2B-779070CFDBE1.jpeg",
    "price": 229.7,
    "category": "Seascape Photography"
  },
  {
    "id": 223,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2021",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/DD56CFC3-470B-402C-B4DB-3D1CA6E1169E.jpeg",
    "price": 198.31,
    "category": "Landscape Photography"
  },
  {
    "id": 224,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2017",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/66DE038C-E21C-4274-B5E8-E41F527833A2.jpeg",
    "price": 156.22,
    "category": "Nature Photography"
  },
  {
    "id": 225,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2019",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/80AE608F-20E2-4415-9E91-3D97817DAA3B.jpeg",
    "price": 289.03,
    "category": "Seascape Photography"
  },
  {
    "id": 226,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2021",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/97C075C9-0E77-4EAD-A5FA-02469B136F96.jpeg",
    "price": 191.43,
    "category": "Landscape Photography"
  },
  {
    "id": 227,
    "name": "Quiet An Elephant In The Savanna",
     
    "year": "2018",
    "description": "A an elephant in the savanna with snowy mountains, rendered as minimalist photography.",
    "image": "/new_paintings/60CE7501-3742-440D-A168-3160251404EE.jpeg",
    "price": 92.57,
    "category": "Minimalist Photography"
  },
  {
    "id": 228,
    "name": "A Butterfly On Flowers at Wildflowers In A Meadow",
     
    "year": "2023",
    "description": "A a butterfly on flowers with wildflowers in a meadow, rendered as nature photography.",
    "image": "/new_paintings/6C17AA90-36B5-41EC-BC60-0FFFCB4029AE.jpeg",
    "price": 208.54,
    "category": "Nature Photography"
  },
  {
    "id": 229,
    "name": "Snowy Mountains & Geometric Abstract Shapes",
     
    "year": "2017",
    "description": "A snowy mountains with geometric abstract shapes, rendered as minimalist photography.",
    "image": "/new_paintings/BEA9BF90-516C-4199-96E0-E9C812C6CB3F.jpeg",
    "price": 144.14,
    "category": "Minimalist Photography"
  },
  {
    "id": 230,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2018",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as minimalist photography.",
    "image": "/new_paintings/C0328FE9-8B58-459D-BAFE-F7EB4A8AE330.jpeg",
    "price": 92.39,
    "category": "Minimalist Photography"
  },
  {
    "id": 231,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2019",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/FA31634B-2FF0-45C0-BC21-B196701B2E1D.jpeg",
    "price": 181.01,
    "category": "Nature Photography"
  },
  {
    "id": 232,
    "name": "Dream of Wildflowers In A Meadow",
     
    "year": "2024",
    "description": "A wildflowers in a meadow with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/B1C7E013-50F8-49D2-BE33-2E38588EEF9D.jpeg",
    "price": 216.41,
    "category": "Nature Photography"
  },
  {
    "id": 233,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2015",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/29647AB6-6E0E-4929-B49E-B97CBF924117.jpeg",
    "price": 172.23,
    "category": "Seascape Photography"
  },
  {
    "id": 234,
    "name": "Dream of Snowy Mountains",
     
    "year": "2014",
    "description": "A snowy mountains with a rainbow over hills, rendered as landscape photography.",
    "image": "/new_paintings/C8F30EAE-31DD-42B3-8B8D-95D2BA9F3294.jpeg",
    "price": 133.78,
    "category": "Landscape Photography"
  },
  {
    "id": 235,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2024",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/1944D2BB-31CD-40F7-BC6E-60A9E797ADF1.jpeg",
    "price": 240.35,
    "category": "Nature Photography"
  },
  {
    "id": 236,
    "name": "Quiet Snowy Mountains",
     
    "year": "2013",
    "description": "A snowy mountains with minimalist color blocks, rendered as minimalist photography.",
    "image": "/new_paintings/DD4DBFD9-4614-4DA6-A608-1ED12C0AD9BC.jpeg",
    "price": 62.97,
    "category": "Minimalist Photography"
  },
  {
    "id": 237,
    "name": "Quiet A Rainbow Over Hills",
     
    "year": "2016",
    "description": "A a rainbow over hills with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/B00AE7BB-50FB-4ACE-BEBD-AD10BF95E8DC.jpeg",
    "price": 147.95,
    "category": "Nature Photography"
  },
  {
    "id": 238,
    "name": "Under A Rainbow Over Hills: A Sunrise Over Mountains",
     
    "year": "2025",
    "description": "A a sunrise over mountains with a rainbow over hills, rendered as landscape photography.",
    "image": "/new_paintings/883177CC-4686-4EC2-B66A-9B68D75A1305.jpeg",
    "price": 225.78,
    "category": "Landscape Photography"
  },
  {
    "id": 239,
    "name": "A Beach With Gentle Waves in A Sunset At The Pier",
     
    "year": "2018",
    "description": "A a beach with gentle waves with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/F9C5FC3D-D113-491D-97F6-180FE534894D.jpeg",
    "price": 195.82,
    "category": "Seascape Photography"
  },
  {
    "id": 240,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2018",
    "description": "A a forest pathway with a foggy forest, rendered as nature photography.",
    "image": "/new_paintings/1C807A45-9F73-462E-9B99-C25A72C19819.jpeg",
    "price": 163.83,
    "category": "Nature Photography"
  },
  {
    "id": 241,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2021",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as nature photography.",
    "image": "/new_paintings/EE34257E-73F3-4477-8AB8-984C801CEA18.jpeg",
    "price": 190.37,
    "category": "Nature Photography"
  },
  {
    "id": 242,
    "name": "A Bridge Over A River A Beach With Gentle Waves",
     
    "year": "2024",
    "description": "A a beach with gentle waves with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/6319E9E0-575B-4A16-9C07-7DABAD25CC6B.jpeg",
    "price": 271.94,
    "category": "Seascape Photography"
  },
  {
    "id": 243,
    "name": "Seashells In A Basket in A Ceramic Vase On A Table",
     
    "year": "2014",
    "description": "A seashells in a basket with a ceramic vase on a table, rendered as botanical photography.",
    "image": "/new_paintings/93D7056F-BB47-4668-BF6D-55B04DCE7D38.jpeg",
    "price": 103.24,
    "category": "Botanical Photography"
  },
  {
    "id": 244,
    "name": "Serenity: Autumn Foliage",
     
    "year": "2018",
    "description": "A autumn foliage with a forest pathway, rendered as impressionist painting.",
    "image": "/new_paintings/BFC10250-5F27-422A-B163-0C7BA70E0A91.jpeg",
    "price": 268.89,
    "category": "Impressionist Painting"
  },
  {
    "id": 245,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2022",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/5B6DC350-0456-4C56-850C-B18D7C8523B9.jpeg",
    "price": 235.98,
    "category": "Seascape Photography"
  },
  {
    "id": 246,
    "name": "Whispers of A Rainbow Over Hills",
     
    "year": "2016",
    "description": "A a rainbow over hills with an elephant in the savanna, rendered as nature photography.",
    "image": "/new_paintings/4999A553-2424-48E7-9891-6B29A45E5BE3.jpeg",
    "price": 154.69,
    "category": "Nature Photography"
  },
  {
    "id": 247,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2017",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as nature photography.",
    "image": "/new_paintings/2B554057-1721-4C00-876C-7E489DEE784C.jpeg",
    "price": 250.48,
    "category": "Nature Photography"
  },
  {
    "id": 248,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2013",
    "description": "A a potted cactus with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/AAC68304-6962-40C5-9DD7-C1EF3C3EF0C8.jpeg",
    "price": 100.08,
    "category": "Macro Photography"
  },
  {
    "id": 249,
    "name": "Poem of A Bridge Over A River",
     
    "year": "2020",
    "description": "A a bridge over a river with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/E31E1931-5E06-4A68-B1CC-39273C516E22.jpeg",
    "price": 278.4,
    "category": "Seascape Photography"
  },
  {
    "id": 250,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2019",
    "description": "A a sunset at the pier with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/73C9A733-5FE9-4323-8094-75897E4B78D7.jpeg",
    "price": 207.92,
    "category": "Seascape Photography"
  },
  {
    "id": 251,
    "name": "Geometric Abstract Shapes Storm Clouds Over The Ocean",
     
    "year": "2014",
    "description": "A storm clouds over the ocean with geometric abstract shapes, rendered as nature photography.",
    "image": "/new_paintings/6997C283-F19E-4D9E-885A-63FAE8C100A0.jpeg",
    "price": 137.44,
    "category": "Nature Photography"
  },
  {
    "id": 252,
    "name": "A City Skyline At Night at Geometric Abstract Shapes",
     
    "year": "2013",
    "description": "A a city skyline at night with geometric abstract shapes, rendered as night photography.",
    "image": "/new_paintings/24B10E98-B214-4FFD-84B3-9B8E3C085702.jpeg",
    "price": 136.64,
    "category": "Night Photography"
  },
  {
    "id": 253,
    "name": "Echoes of Seashells In A Basket",
     
    "year": "2016",
    "description": "A seashells in a basket with geometric abstract shapes, rendered as macro photography.",
    "image": "/new_paintings/488B8D89-10B3-4C3D-937D-B3D04650F369.jpeg",
    "price": 128.03,
    "category": "Macro Photography"
  },
  {
    "id": 254,
    "name": "Whispers of A Beach With Gentle Waves",
     
    "year": "2013",
    "description": "A a beach with gentle waves with a lighthouse by the sea, rendered as seascape photography.",
    "image": "/new_paintings/E7533C1F-2A1E-4270-9023-E74C0C4D18D8.jpeg",
    "price": 158.27,
    "category": "Seascape Photography"
  },
  {
    "id": 255,
    "name": "Serenity: A Calm Mountain Lake",
     
    "year": "2023",
    "description": "A a calm mountain lake with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/28B604AA-F391-415E-8C5D-E2429B4CCB53.jpeg",
    "price": 245.57,
    "category": "Seascape Photography"
  },
  {
    "id": 256,
    "name": "Under Snowy Mountains: A Beach With Gentle Waves",
     
    "year": "2025",
    "description": "A a beach with gentle waves with snowy mountains, rendered as seascape photography.",
    "image": "/new_paintings/3EC1B106-EEF1-4A1B-8C6F-AEE9CD93B36D.jpeg",
    "price": 256.88,
    "category": "Seascape Photography"
  },
  {
    "id": 257,
    "name": "A Foggy Forest A Forest Pathway",
     
    "year": "2022",
    "description": "A a forest pathway with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/3713623F-EB73-40F8-B4E8-DC64CB88B3D1.jpeg",
    "price": 202.65,
    "category": "Landscape Photography"
  },
  {
    "id": 258,
    "name": "Serenity: A Calm Mountain Lake",
     
    "year": "2017",
    "description": "A a calm mountain lake with a glacier and iceberg, rendered as seascape photography.",
    "image": "/new_paintings/FB23E63F-1532-4964-B1B9-DB3D5210CC64.jpeg",
    "price": 186.99,
    "category": "Seascape Photography"
  },
  {
    "id": 259,
    "name": "Song of Wildflowers In A Meadow",
     
    "year": "2023",
    "description": "A wildflowers in a meadow with a lotus pond, rendered as nature photography.",
    "image": "/new_paintings/2F7CF13C-9064-4487-AA32-23507AC51A71.jpeg",
    "price": 214.19,
    "category": "Nature Photography"
  },
  {
    "id": 260,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2023",
    "description": "A a sunset at the pier with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/779EFAEF-6085-4533-A325-2A4C2E9B87BA.jpeg",
    "price": 275.68,
    "category": "Seascape Photography"
  },
  {
    "id": 261,
    "name": "Poem of Wildflowers In A Meadow",
     
    "year": "2025",
    "description": "A wildflowers in a meadow with a deer in a meadow, rendered as nature photography.",
    "image": "/new_paintings/D2E59BA4-E2A7-459C-B4E6-5AAF888EDE4B.jpeg",
    "price": 228.66,
    "category": "Nature Photography"
  },
  {
    "id": 262,
    "name": "Storm Clouds Over The Ocean & A Foggy Forest",
     
    "year": "2023",
    "description": "A storm clouds over the ocean with a foggy forest, rendered as landscape photography.",
    "image": "/new_paintings/E13691A2-0BAB-4B9A-A71E-8C1834023381.jpeg",
    "price": 211.91,
    "category": "Landscape Photography"
  },
  {
    "id": 263,
    "name": "A Butterfly On Flowers at Wildflowers In A Meadow",
     
    "year": "2025",
    "description": "A a butterfly on flowers with wildflowers in a meadow, rendered as nature photography.",
    "image": "/new_paintings/1A72FEF6-8511-4FD5-BB71-ED6F134BD636.jpeg",
    "price": 233.62,
    "category": "Nature Photography"
  },
  {
    "id": 264,
    "name": "A Desert With Sand Dunes A Beach With Gentle Waves",
     
    "year": "2025",
    "description": "A a beach with gentle waves with a desert with sand dunes, rendered as seascape photography.",
    "image": "/new_paintings/A8525253-F45A-41DB-AD26-B28FC431E62A.jpeg",
    "price": 286.04,
    "category": "Seascape Photography"
  },
  {
    "id": 265,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2017",
    "description": "A a sunset at the pier with a sunrise over mountains, rendered as seascape photography.",
    "image": "/new_paintings/F1B7225E-B64A-4AAF-9B55-6F2E9491606C.jpeg",
    "price": 284.02,
    "category": "Seascape Photography"
  },
  {
    "id": 266,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2024",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as nature photography.",
    "image": "/new_paintings/402D77C8-5454-4452-A66C-F5A9FAA883E0.jpeg",
    "price": 218.04,
    "category": "Nature Photography"
  },
  {
    "id": 267,
    "name": "Under A Butterfly On Flowers: Wildflowers In A Meadow",
     
    "year": "2019",
    "description": "A wildflowers in a meadow with a butterfly on flowers, rendered as botanical photography.",
    "image": "/new_paintings/C2824832-188C-4119-B114-915CD515E94B.jpeg",
    "price": 137.64,
    "category": "Botanical Photography"
  },
  {
    "id": 268,
    "name": "Serenity: A Rainbow Over Hills",
     
    "year": "2018",
    "description": "A a rainbow over hills with a waterfall in a canyon, rendered as nature photography.",
    "image": "/new_paintings/3EDEF1DB-4555-4F56-B7D1-EA9ADDE93949.jpeg",
    "price": 164.56,
    "category": "Nature Photography"
  },
  {
    "id": 269,
    "name": "Quiet Geometric Abstract Shapes",
     
    "year": "2014",
    "description": "A geometric abstract shapes with snowy mountains, rendered as minimalist photography.",
    "image": "/new_paintings/727F5A8B-FAFB-4170-9AA6-C3196E29771B.jpeg",
    "price": 69.92,
    "category": "Minimalist Photography"
  },
  {
    "id": 270,
    "name": "An Elephant In The Savanna A Foggy Forest",
     
    "year": "2019",
    "description": "A a foggy forest with an elephant in the savanna, rendered as landscape photography.",
    "image": "/new_paintings/095071FE-D84B-4CE2-B946-D8FD634BF69C.jpeg",
    "price": 178.87,
    "category": "Landscape Photography"
  },
  {
    "id": 271,
    "name": "Echoes of A Calm Mountain Lake",
     
    "year": "2024",
    "description": "A a calm mountain lake with a lotus pond, rendered as landscape photography.",
    "image": "/new_paintings/7E164DAC-4651-4C48-AC76-6B2863CE54CE 2.jpeg",
    "price": 248.79,
    "category": "Landscape Photography"
  },
  {
    "id": 272,
    "name": "A Potted Cactus at Geometric Abstract Shapes",
     
    "year": "2015",
    "description": "A a potted cactus with geometric abstract shapes, rendered as botanical photography.",
    "image": "/new_paintings/1EB2A8AE-534E-4560-82E8-50F76DDFACCF.jpeg",
    "price": 198.39,
    "category": "Botanical Photography"
  },
  {
    "id": 273,
    "name": "Serenity: A Calm Mountain Lake",
     
    "year": "2013",
    "description": "A a calm mountain lake with a bridge over a river, rendered as still life photography.",
    "image": "/new_paintings/393027BF-6566-4F7B-86DE-25739F7EF39B.jpeg",
    "price": 85.66,
    "category": "Still Life Photography"
  },
  {
    "id": 274,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2024",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/E556841E-0E3E-40A6-AF62-ABD6DFE36859.jpeg",
    "price": 246.66,
    "category": "Seascape Photography"
  },
  {
    "id": 275,
    "name": "Serenity: Seashells In A Basket",
     
    "year": "2022",
    "description": "A seashells in a basket with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/5A6622C1-CED4-4C9D-8902-0D1A5E5E2065.jpeg",
    "price": 230.49,
    "category": "Seascape Photography"
  },
  {
    "id": 276,
    "name": "Geometric Abstract Shapes Storm Clouds Over The Ocean",
     
    "year": "2015",
    "description": "A storm clouds over the ocean with geometric abstract shapes, rendered as nature photography.",
    "image": "/new_paintings/50A73282-BCC3-48A2-B0EA-1AB55EC7ABBE.jpeg",
    "price": 142.34,
    "category": "Nature Photography"
  },
  {
    "id": 277,
    "name": "Dream of Snowy Mountains",
     
    "year": "2016",
    "description": "A snowy mountains with a rainbow over hills, rendered as landscape photography.",
    "image": "/new_paintings/39D7F683-5361-43D1-BE01-CCF587B4DF97.jpeg",
    "price": 152.18,
    "category": "Landscape Photography"
  },
  {
    "id": 278,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2017",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/6A8145EB-735F-4B06-ABA3-387475D1D923.jpeg",
    "price": 190.49,
    "category": "Seascape Photography"
  },
  {
    "id": 279,
    "name": "A Calm Mountain Lake & A Wooden Boat On A Lake",
     
    "year": "2025",
    "description": "A a calm mountain lake with a wooden boat on a lake, rendered as landscape photography.",
    "image": "/new_paintings/B4E4387C-D531-4B44-B93F-AB5D199995CC.jpeg",
    "price": 231.74,
    "category": "Landscape Photography"
  },
  {
    "id": 280,
    "name": "Poem of Wildflowers In A Meadow",
     
    "year": "2016",
    "description": "A wildflowers in a meadow with a deer in a meadow, rendered as botanical photography.",
    "image": "/new_paintings/3721B27C-FD6B-4454-9D91-183059654E32.jpeg",
    "price": 112.31,
    "category": "Botanical Photography"
  },
  {
    "id": 281,
    "name": "Quiet Wildflowers In A Meadow",
     
    "year": "2013",
    "description": "A wildflowers in a meadow with minimalist color blocks, rendered as botanical photography.",
    "image": "/new_paintings/6F395DE9-B3C3-4CF5-835A-9BD864557F13.jpeg",
    "price": 92.61,
    "category": "Botanical Photography"
  },
  {
    "id": 282,
    "name": "Dream of A Wooden Boat On A Lake",
     
    "year": "2018",
    "description": "A a wooden boat on a lake with a sunset at the pier, rendered as seascape photography.",
    "image": "/new_paintings/CD580511-E0A7-43E9-BC73-336115AF06BB.jpeg",
    "price": 283.25,
    "category": "Seascape Photography"
  },
  {
    "id": 283,
    "name": "Song of A Sunset At The Pier",
     
    "year": "2024",
    "description": "A a sunset at the pier with a bridge over a river, rendered as seascape photography.",
    "image": "/new_paintings/A6031327-40DD-4011-B578-AC767EB2E27F.jpeg",
    "price": 248.86,
    "category": "Seascape Photography"
  },
  {
    "id": 284,
    "name": "Poem of Storm Clouds Over The Ocean",
     
    "year": "2021",
    "description": "A storm clouds over the ocean with snowy mountains, rendered as aerial photography.",
    "image": "/new_paintings/E75E66F7-77B1-4D6D-830E-703C5C8EDFA6.jpeg",
    "price": 227.89,
    "category": "Aerial Photography"
  },
  {
    "id": 285,
    "name": "Under A Calm Mountain Lake: A Beach With Gentle Waves",
     
    "year": "2020",
    "description": "A a beach with gentle waves with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/C2CDEA21-440A-4743-9B28-154C4B6D8972.jpeg",
    "price": 219.4,
    "category": "Seascape Photography"
  },
  {
    "id": 286,
    "name": "Song of A Sunrise Over Mountains",
     
    "year": "2015",
    "description": "A a sunrise over mountains with a calm mountain lake, rendered as seascape photography.",
    "image": "/new_paintings/91E72D9C-B39D-49BC-B006-8644AE31ACFF.jpeg",
    "price": 174.73,
    "category": "Seascape Photography"
  },
  {
    "id": 287,
    "name": "Echoes of A Sunset At The Pier",
     
    "year": "2023",
    "description": "A a sunset at the pier with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/C4083E71-6372-4065-81AF-555372D4AB71.jpeg",
    "price": 245.2,
    "category": "Seascape Photography"
  },
  {
    "id": 288,
    "name": "A Rainbow Over Hills in A Beach With Gentle Waves",
     
    "year": "2018",
    "description": "A a rainbow over hills with a beach with gentle waves, rendered as seascape photography.",
    "image": "/new_paintings/8825A85E-1F93-422F-8D23-0F2C9ABE7B77.jpeg",
    "price": 199.73,
    "category": "Seascape Photography"
  }
];

export default paintings;