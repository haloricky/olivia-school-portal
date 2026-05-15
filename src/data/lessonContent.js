export interface VocabItem {
  en: string;
  id: string;
}

export interface LessonContent {
  story: string;
  teaching: string[];
  vocab: VocabItem[];
  activity: string;
  worksheet_url: string;
  game_type: string;
}

export const LESSON_CONTENT: Record<number, LessonContent> = {
  1: {
    story: "Papa closes Olivia's eyes and says: 'Imagine you can fly like a bird — so high you can see the whole Earth from above. What do you see?'",
    teaching: [
      "Earth is round like a giant ball",
      "There are 7 continents and 5 oceans in the world",
      "Indonesia is in Asia, right on the equator",
      "We live in an archipelago — over 17,000 islands!",
      "A map is a picture of the Earth seen from above"
    ],
    vocab: [
      { en: "Earth", id: "Bumi" },
      { en: "Island", id: "Pulau" },
      { en: "Ocean", id: "Samudra" },
      { en: "Continent", id: "Benua" },
      { en: "Map", id: "Peta" },
      { en: "Country", id: "Negara" }
    ],
    activity: "Draw a bird's-eye view map of Olivia's bedroom! Where is the bed? Where is the door? Where is the window?",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "continents"
  },
  2: {
    story: "'Olivia, 5,000 years ago in Africa, people built buildings as tall as a 40-story skyscraper — with no machines, no cranes. Just their own hands. Want to know how?'",
    teaching: [
      "Ancient Egypt is one of the oldest civilizations in the world",
      "Pharaohs were the kings of ancient Egypt, worshipped like gods",
      "The pyramids were built as royal tombs for the pharaohs",
      "Hieroglyphics is the ancient Egyptian writing system using pictures",
      "The Nile River gave water and life to all of Egypt"
    ],
    vocab: [
      { en: "Pharaoh", id: "Firaun" },
      { en: "Pyramid", id: "Piramida" },
      { en: "Hieroglyphs", id: "Hieroglif" },
      { en: "Mummy", id: "Mumi" },
      { en: "Ancient", id: "Kuno" },
      { en: "Civilization", id: "Peradaban" }
    ],
    activity: "Make your own hieroglyphics! Draw 5 pictures that represent your day today.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "egypt"
  },
  3: {
    story: "'Olivia, close your eyes. Be very still and listen carefully.' Olivia is quiet for a moment. 'That's your heartbeat! It works non-stop — even while you sleep!'",
    teaching: [
      "The heart pumps blood around the whole body like a water pump",
      "The lungs take in oxygen from the air we breathe",
      "The brain is the commander — it controls everything",
      "We have 5 senses: seeing, hearing, smelling, tasting, and touching",
      "Bones protect our organs and help us stand up straight"
    ],
    vocab: [
      { en: "Heart", id: "Jantung" },
      { en: "Lungs", id: "Paru-paru" },
      { en: "Brain", id: "Otak" },
      { en: "Senses", id: "Indra" },
      { en: "Bone", id: "Tulang" },
      { en: "Muscle", id: "Otot" }
    ],
    activity: "Trace Olivia's body outline on a big piece of paper, then draw the organs inside: heart, lungs, brain, and stomach!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "body"
  },
  4: {
    story: "'Olivia, how many steps from your bedroom to the kitchen?' Olivia walks along counting out loud. 'Twelve!' Papa smiles. 'Congratulations! You just used mathematics!'",
    teaching: [
      "Numbers are everywhere — at home, on the road, at the shop",
      "We can count real objects all around us",
      "Learning 1 to 20, slowly but surely!",
      "More vs less: which group has more?",
      "Number order: which number comes before and after?"
    ],
    vocab: [
      { en: "Number", id: "Angka" },
      { en: "Count", id: "Hitung" },
      { en: "More", id: "Lebih banyak" },
      { en: "Less", id: "Lebih sedikit" },
      { en: "First", id: "Pertama" },
      { en: "Last", id: "Terakhir" }
    ],
    activity: "Number hunt around the whole house! Find numbers on the TV remote, fridge, door, books, and calendar.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "numbers"
  },
  5: {
    story: "'If there were no traffic rules, what would happen?' Papa draws lots of cars on paper with no lanes. 'They would all crash into each other!' Olivia laughs.",
    teaching: [
      "Rules are made to protect and keep everyone safe",
      "Home rules: brush teeth, tidy bed, sleep on time",
      "School rules: listen to teacher, no hitting, take turns",
      "Road rules: red light means stop, don't litter",
      "When everyone follows the rules, everything becomes safer and fairer"
    ],
    vocab: [
      { en: "Rule", id: "Aturan" },
      { en: "Safe", id: "Aman" },
      { en: "Fair", id: "Adil" },
      { en: "Respect", id: "Menghormati" },
      { en: "Obey", id: "Mematuhi" },
      { en: "Protect", id: "Melindungi" }
    ],
    activity: "Make Our House Rules book! Draw 5 important rules for your home. Stick it on the fridge for everyone to see!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "rules"
  },
  6: {
    story: "'Olivia, the dress Mama wore to the wedding — that's called batik. But did you know every batik pattern has its own story?' Papa shows photos of batik from different regions.",
    teaching: [
      "Batik is Indonesia's most famous fabric art",
      "Made using wax (malam) and dye — a resist-dye technique",
      "Every region has different patterns: Jogja, Solo, Pekalongan, Cirebon",
      "Batik was recognised by UNESCO as world cultural heritage in 2009",
      "Batik patterns have meaning: bird = freedom, flower = beauty"
    ],
    vocab: [
      { en: "Batik", id: "Batik" },
      { en: "Pattern", id: "Motif" },
      { en: "Fabric", id: "Kain" },
      { en: "Wax", id: "Malam/lilin" },
      { en: "Dye", id: "Pewarna" },
      { en: "Traditional", id: "Tradisional" }
    ],
    activity: "Make paper batik! Draw a pattern with a white wax crayon, then brush watercolour paint over it. The pattern magically appears!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "batik"
  },
  7: {
    story: "'Have you ever felt so happy inside but found it hard to tell someone?' Papa draws a big smiley face. 'That's called a feeling. Everyone has them — and all feelings are allowed.'",
    teaching: [
      "Everyone has different feelings every single day",
      "Angry, sad, scared, happy — they are all normal and OK",
      "It's important to be able to name the feeling you are feeling",
      "If you feel sad or scared, you can always talk to Papa or Mama",
      "Other people's feelings matter just as much as our own"
    ],
    vocab: [
      { en: "Happy", id: "Senang" },
      { en: "Sad", id: "Sedih" },
      { en: "Angry", id: "Marah" },
      { en: "Scared", id: "Takut" },
      { en: "Proud", id: "Bangga" },
      { en: "Feelings", id: "Perasaan" }
    ],
    activity: "Make Olivia's Feelings Wheel! Draw a circle divided into 6 parts — one feeling per section, each with its own colour and expression.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month1.pdf",
    game_type: "feelings"
  },

  // ── MONTH 2 — Living Things ──────────────────────────────────────────────

  8: {
    story: "'Olivia, imagine a place so enormous it could fit three of our whole country — and it's filled with the most amazing animals in the world. That's Africa!'",
    teaching: [
      "Africa is the second-largest continent in the world",
      "The Sahara Desert in Africa is the biggest desert on Earth",
      "Africa is home to the world's largest land animal — the elephant",
      "The Nile River (from Week 2!) is in Africa — the longest river in the world",
      "Africa has 54 countries and hundreds of different languages"
    ],
    vocab: [
      { en: "Savannah", id: "Sabana" },
      { en: "Elephant", id: "Gajah" },
      { en: "Lion", id: "Singa" },
      { en: "Desert", id: "Gurun" },
      { en: "Migration", id: "Migrasi" },
      { en: "Wildlife", id: "Satwa liar" }
    ],
    activity: "Draw your favourite African animal in its home — a lion in the savannah or an elephant at the watering hole!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "africa_animals"
  },
  9: {
    story: "'Olivia, did you know something you use every single day was invented in China over 2,000 years ago?' Olivia looks puzzled. 'Paper!' Papa holds up her drawing book.",
    teaching: [
      "Ancient China created four famous inventions that changed the world",
      "Paper was invented in China — before that, people wrote on bamboo and silk",
      "The compass helped sailors navigate the oceans for the first time",
      "Printing allowed books to be made quickly, sharing ideas everywhere",
      "Fireworks were invented in China for celebrations — and are still used today!"
    ],
    vocab: [
      { en: "Invention", id: "Penemuan" },
      { en: "Paper", id: "Kertas" },
      { en: "Compass", id: "Kompas" },
      { en: "Printing", id: "Percetakan" },
      { en: "Silk", id: "Sutra" },
      { en: "Fireworks", id: "Kembang api" }
    ],
    activity: "Make a mini accordion book! Fold paper into 6 sections and draw one Chinese invention in each section.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "inventions_match"
  },
  10: {
    story: "'Olivia, how do you think plants eat?' She thinks hard. 'From the soil?' Papa nods, 'Partly right! But they also eat sunshine. They literally eat light!'",
    teaching: [
      "Plants make their own food using sunlight, water, and air — called photosynthesis",
      "Leaves are the plant's food factory — they capture sunlight",
      "Roots soak up water and minerals from the soil",
      "The stem carries water up from the roots to the leaves",
      "Plants give us oxygen as a by-product of making food — we breathe it!"
    ],
    vocab: [
      { en: "Leaf", id: "Daun" },
      { en: "Root", id: "Akar" },
      { en: "Stem", id: "Batang" },
      { en: "Flower", id: "Bunga" },
      { en: "Sunlight", id: "Sinar matahari" },
      { en: "Photosynthesis", id: "Fotosintesis" }
    ],
    activity: "Plant a bean seed in a cup of soil! Put it by the window and draw what you see each day for one week.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "plant_label"
  },
  11: {
    story: "'Olivia, Papa has 3 oranges. Then he buys 4 more at the market. How many does he have now?' Olivia counts on her fingers. 'Seven!' She beams.",
    teaching: [
      "Addition means combining two groups into one bigger group",
      "The + sign means we are putting things together",
      "The = sign means 'is the same as'",
      "We can use our fingers or count objects to add",
      "Addition works with any objects: apples, stars, or elephants!"
    ],
    vocab: [
      { en: "Add", id: "Tambah" },
      { en: "Total", id: "Jumlah" },
      { en: "Plus", id: "Ditambah" },
      { en: "Equals", id: "Sama dengan" },
      { en: "Sum", id: "Hasil penjumlahan" },
      { en: "Group", id: "Kelompok" }
    ],
    activity: "Go on an addition treasure hunt! Collect 3 sticks and 4 leaves. Count them together. Then try again with different amounts!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "addition_visual"
  },
  12: {
    story: "'Papa, does everyone's family look the same as ours?' Papa smiles. 'Not at all! In Japan, Grandpa might live with you. In Brazil, you might have ten cousins in one house!'",
    teaching: [
      "Families come in all sizes — small, big, and everything in between",
      "Some families have one parent, some have two, some are raised by grandparents",
      "Families share love, food, stories, and traditions",
      "Every country has its own family traditions and celebrations",
      "Our family is special — however it looks!"
    ],
    vocab: [
      { en: "Family", id: "Keluarga" },
      { en: "Parent", id: "Orang tua" },
      { en: "Sibling", id: "Saudara" },
      { en: "Grandparent", id: "Kakek / Nenek" },
      { en: "Tradition", id: "Tradisi" },
      { en: "Culture", id: "Budaya" }
    ],
    activity: "Draw Olivia's Family Tree! Include Papa, Mama, and all the grandparents. Write each person's name inside a leaf shape.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "families_quiz"
  },
  13: {
    story: "'Olivia, listen!' Papa plays a gamelan recording. The gentle chiming fills the room. 'This music is from Java. Every island in Indonesia has its own special sound.'",
    teaching: [
      "Indonesia has hundreds of traditional musical instruments",
      "The gamelan orchestra is made of bronze gongs and drums — it comes from Java and Bali",
      "The angklung is made of bamboo tubes from West Java — it's a UNESCO treasure",
      "The kendang is a traditional drum used in many dances and ceremonies",
      "Music connects people to their culture and history"
    ],
    vocab: [
      { en: "Music", id: "Musik" },
      { en: "Instrument", id: "Alat musik" },
      { en: "Drum", id: "Gendang" },
      { en: "Bamboo", id: "Bambu" },
      { en: "Orchestra", id: "Orkestra" },
      { en: "Melody", id: "Melodi" }
    ],
    activity: "Make a DIY instrument! Fill 4 glasses with different amounts of water and tap gently with a spoon. Do they make different sounds?",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "instruments_match"
  },
  14: {
    story: "'Papa, can I have that giant teddy bear?' Papa gives a warm smile. 'Let's think about it together — is it something you need, or something you want?' Olivia scrunches her face. 'Want... but I want it a LOT!'",
    teaching: [
      "A NEED is something you must have to live — like food, water, clothes, and a home",
      "A WANT is something you would like but can survive without — like toys and sweets",
      "Saving money means keeping some for later instead of spending it all now",
      "When we save, we can afford bigger and better things in the future",
      "Making good money choices is a skill everyone needs!"
    ],
    vocab: [
      { en: "Need", id: "Kebutuhan" },
      { en: "Want", id: "Keinginan" },
      { en: "Save", id: "Menabung" },
      { en: "Spend", id: "Belanja" },
      { en: "Money", id: "Uang" },
      { en: "Piggy bank", id: "Celengan" }
    ],
    activity: "Make Olivia's Savings Jar! Decorate an empty jar and start saving coins. Draw what you are saving up for on a label!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month2.pdf",
    game_type: "needs_wants_sort"
  },

  // ── MONTH 3 — The Wide World ──────────────────────────────────────────────

  15: {
    story: "'Olivia, imagine flying around the whole Earth. What would you pass over?' Papa pulls out the globe and they spin it together. 'Let's count the continents!'",
    teaching: [
      "There are 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America",
      "Asia is the biggest continent — home to over half the world's people",
      "Australia is both a continent and a single country",
      "Antarctica is the coldest place on Earth — covered in ice all year",
      "Each continent has its own unique animals, cultures, and landscapes"
    ],
    vocab: [
      { en: "Continent", id: "Benua" },
      { en: "Largest", id: "Terbesar" },
      { en: "Smallest", id: "Terkecil" },
      { en: "Population", id: "Penduduk" },
      { en: "Equator", id: "Khatulistiwa" },
      { en: "Pole", id: "Kutub" }
    ],
    activity: "Draw and label all 7 continents from memory! Colour each one a different colour and write one fact about each.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "continent_facts_quiz"
  },
  16: {
    story: "'Olivia, 2,500 years ago, people in Greece invented something we still use today — the idea that every citizen gets a vote.' Olivia's eyes go wide. 'Even children?' Papa laughs. 'When you grow up!'",
    teaching: [
      "Ancient Greece was one of the world's first great civilisations",
      "The Greeks invented democracy — the idea that citizens vote and make decisions together",
      "The ancient Olympics began in Greece in 776 BC — held every 4 years",
      "Greek gods like Zeus, Athena, and Poseidon were believed to control nature and human life",
      "Greek thinkers like Socrates, Plato, and Aristotle asked big questions about life"
    ],
    vocab: [
      { en: "Democracy", id: "Demokrasi" },
      { en: "Olympics", id: "Olimpiade" },
      { en: "Myth", id: "Mitos" },
      { en: "Philosopher", id: "Filsuf" },
      { en: "Temple", id: "Kuil" },
      { en: "Citizen", id: "Warga negara" }
    ],
    activity: "Design your own Greek-style shield! Draw a symbol in the centre that represents you — like a star, animal, or your favourite thing.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "timeline_order"
  },
  17: {
    story: "'Papa, where does rain come from?' Papa fills a pot with water. 'Let's find out together. Watch what happens when the sun heats the sea...'",
    teaching: [
      "The water cycle is nature's way of moving water around the Earth — forever and ever",
      "Evaporation: the sun heats water in oceans and lakes, turning it into water vapour that rises",
      "Condensation: water vapour cools high in the sky and forms clouds",
      "Precipitation: when clouds become heavy, water falls as rain, snow, or hail",
      "Collection: water flows into rivers and oceans — and the cycle starts all over again!"
    ],
    vocab: [
      { en: "Evaporation", id: "Penguapan" },
      { en: "Condensation", id: "Kondensasi" },
      { en: "Precipitation", id: "Presipitasi" },
      { en: "Cloud", id: "Awan" },
      { en: "River", id: "Sungai" },
      { en: "Cycle", id: "Siklus" }
    ],
    activity: "Make a water cycle in a bag! Put a little water in a zip-lock bag and tape it to a sunny window. Watch the water evaporate and condense!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "cycle_sequence"
  },
  18: {
    story: "'Olivia has 9 grapes. She eats 4. How many are left?' Papa puts 9 grapes on the table and moves 4 away. 'Count the ones still here!' Olivia counts carefully. 'Five!'",
    teaching: [
      "Subtraction means taking away from a group to find what remains",
      "The − sign means we are taking away",
      "We can cross out objects to see how many are left",
      "Subtraction is the opposite of addition",
      "Knowing subtraction helps with shopping, cooking, and everyday life!"
    ],
    vocab: [
      { en: "Subtract", id: "Kurangi" },
      { en: "Minus", id: "Dikurangi" },
      { en: "Difference", id: "Selisih" },
      { en: "Remaining", id: "Sisa" },
      { en: "Take away", id: "Ambil" },
      { en: "Left over", id: "Tersisa" }
    ],
    activity: "Subtraction with snacks! Put 10 raisins in a row. Eat 3. How many are left? Try again with different amounts. Math is delicious!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "subtraction_visual"
  },
  19: {
    story: "'Papa, if Indonesia and China have an argument, who decides who is right?' Papa smiles. 'Great question! That's exactly why the United Nations was created — so countries can talk it out instead of fight.'",
    teaching: [
      "The United Nations (UN) was created in 1945 to keep world peace",
      "193 countries belong to the UN — almost every country on Earth",
      "The UN protects human rights — things every person deserves, no matter where they live",
      "UNICEF is the UN organisation that protects and supports children around the world",
      "The UN uses 6 official languages: Arabic, Chinese, English, French, Russian, Spanish"
    ],
    vocab: [
      { en: "United Nations", id: "Perserikatan Bangsa-Bangsa" },
      { en: "Peace", id: "Perdamaian" },
      { en: "Human rights", id: "Hak asasi manusia" },
      { en: "Organisation", id: "Organisasi" },
      { en: "Member", id: "Anggota" },
      { en: "Cooperation", id: "Kerjasama" }
    ],
    activity: "Design your own country's flag! Give it a name, choose colours and a symbol that represents your values — peace, nature, or strength.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "country_match"
  },
  20: {
    story: "'Olivia, every country in the world makes art — but they all make it differently.' Papa opens a book showing paintings, puppets, and prints from across the globe. 'Let's go on an art adventure!'",
    teaching: [
      "Every culture in the world has its own unique form of visual art",
      "Impressionism from France uses soft brushstrokes to capture light and feeling",
      "Ukiyo-e from Japan creates detailed woodblock prints of nature and daily life",
      "Aboriginal art from Australia uses dots to tell ancient stories called Dreamtime",
      "Wayang from Indonesia creates shadow puppet art from buffalo hide"
    ],
    vocab: [
      { en: "Art style", id: "Aliran seni" },
      { en: "Painting", id: "Lukisan" },
      { en: "Sculpture", id: "Patung" },
      { en: "Printmaking", id: "Seni cetak" },
      { en: "Mosaic", id: "Mosaik" },
      { en: "Masterpiece", id: "Mahakarya" }
    ],
    activity: "Create your own masterpiece inspired by one of the world art styles! Try dot painting like Aboriginal art or soft watery colours like Impressionism.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "art_style_match"
  },
  21: {
    story: "'Papa, why do I have to eat vegetables?' Papa laughs. 'Let me ask you this — what does a car need to run properly?' Olivia thinks. 'Petrol?' 'Exactly! And your body needs healthy food — that's your petrol!'",
    teaching: [
      "A healthy lifestyle includes good food, enough sleep, regular exercise, and clean habits",
      "Our bodies need fruits, vegetables, protein, and water every single day",
      "Children need 9–11 hours of sleep each night for their brains to grow and learn",
      "Exercise for at least 60 minutes every day keeps the heart and muscles strong",
      "Washing hands, brushing teeth, and staying clean prevents illness"
    ],
    vocab: [
      { en: "Healthy", id: "Sehat" },
      { en: "Exercise", id: "Olahraga" },
      { en: "Nutrition", id: "Gizi" },
      { en: "Hygiene", id: "Kebersihan" },
      { en: "Sleep", id: "Tidur" },
      { en: "Habit", id: "Kebiasaan" }
    ],
    activity: "Make Olivia's Healthy Day chart! Draw all 24 hours and fill in: sleep time, meal times, exercise time, learning time, and play time.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month3.pdf",
    game_type: "habits_sort"
  },

  // ── MONTH 4 — My Wonderful World ─────────────────────────────────────────

  22: {
    story: "'Papa, why is it so hot here but Grandma says it snows where she lives?' Papa smiles. 'That's because of climate, Olivia! Every part of the world has its own special weather pattern.'",
    teaching: [
      "Climate is the long-term pattern of weather in a place — not just today's weather",
      "Tropical climates (like Indonesia) are hot and rainy all year round",
      "Temperate climates have four seasons: spring, summer, autumn, and winter",
      "Polar climates near the North and South Poles are extremely cold all year",
      "Desert climates get very little rain and have huge temperature differences between day and night",
      "Earth tilts as it orbits the sun — this tilt creates the seasons!"
    ],
    vocab: [
      { en: "Climate",      id: "Iklim" },
      { en: "Tropical",     id: "Tropis" },
      { en: "Season",       id: "Musim" },
      { en: "Temperature",  id: "Suhu" },
      { en: "Rainfall",     id: "Curah hujan" },
      { en: "Atmosphere",   id: "Atmosfer" }
    ],
    activity: "Draw Olivia's Climate Wheel! Divide a circle into 4 zones (Tropical, Temperate, Polar, Desert) and draw the animals and plants that live in each.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "weather_sort"
  },
  23: {
    story: "'Olivia, 500 years ago, brave sailors set off in tiny wooden ships not knowing where they would land.' Papa draws a ship on paper. 'They were called explorers — and they changed the whole world.'",
    teaching: [
      "The Age of Exploration (1400s–1600s) was when Europeans sailed to discover new lands and trade routes",
      "Christopher Columbus (Spain, 1492) reached the Americas — calling it the 'New World'",
      "Ferdinand Magellan's crew completed the first journey around the entire globe (1519–1522)",
      "Vasco da Gama found the sea route from Europe around Africa to India (1498)",
      "Marco Polo travelled overland to China (1271) and wrote famous books about his adventures"
    ],
    vocab: [
      { en: "Explorer",      id: "Penjelajah" },
      { en: "Voyage",        id: "Pelayaran" },
      { en: "Navigation",    id: "Navigasi" },
      { en: "Compass",       id: "Kompas" },
      { en: "Discovery",     id: "Penemuan" },
      { en: "Trade route",   id: "Jalur perdagangan" }
    ],
    activity: "Draw Olivia's Explorer Ship! Design your own sailing vessel with a flag and name. Where would you sail to if you were an explorer 500 years ago?",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "explorer_match"
  },
  24: {
    story: "'Papa, how do we know if an animal is a mammal or a fish?' Papa sits down with a big book. 'Great question! Scientists sort animals into groups by what they have in common. Let's explore!'",
    teaching: [
      "Scientists sort animals into groups called classes — mammals, birds, reptiles, fish, and amphibians",
      "Mammals are warm-blooded, have fur or hair, and feed babies milk — humans are mammals!",
      "Birds have feathers, wings, and lay eggs — even penguins and ostriches that cannot fly",
      "Reptiles have scaly skin and are cold-blooded — like snakes, crocodiles, and geckos",
      "Amphibians can live in water AND on land — like frogs, which start as tadpoles in water"
    ],
    vocab: [
      { en: "Mammal",     id: "Mamalia" },
      { en: "Reptile",    id: "Reptil" },
      { en: "Amphibian",  id: "Amfibi" },
      { en: "Feathers",   id: "Bulu" },
      { en: "Cold-blooded", id: "Berdarah dingin" },
      { en: "Classify",   id: "Mengklasifikasi" }
    ],
    activity: "Create Olivia's Animal Album! Draw 1 animal from each group (mammal, bird, reptile, fish, amphibian) and write 2 facts about each one.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "animal_classify"
  },
  25: {
    story: "'Papa, I can see shapes EVERYWHERE!' Olivia looks around the kitchen. 'The plate is a circle, the window is a rectangle, the pizza slice is a triangle!' Papa grins. 'You've got a mathematician's eyes!'",
    teaching: [
      "Shapes are all around us — in buildings, nature, art, and everyday objects",
      "A triangle has 3 sides and 3 corners — the strongest shape in nature and engineering",
      "A square has 4 equal sides — stretch it and it becomes a rectangle",
      "A circle has no sides or corners — it is perfectly round",
      "A hexagon has 6 sides — bees use it to build the most efficient honeycombs",
      "An octagon has 8 sides — you see it every day on STOP signs!"
    ],
    vocab: [
      { en: "Triangle",   id: "Segitiga" },
      { en: "Square",     id: "Persegi" },
      { en: "Rectangle",  id: "Persegi panjang" },
      { en: "Circle",     id: "Lingkaran" },
      { en: "Hexagon",    id: "Heksagon" },
      { en: "Octagon",    id: "Oktagon" }
    ],
    activity: "Go on a Shape Hunt! Walk around your home and find 2 examples of each shape — circle, square, rectangle, triangle. Draw and label what you find!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "shape_sort"
  },
  26: {
    story: "'Papa, is it fair that some children don't get to go to school?' Papa looks thoughtful. 'No, it isn't. That's why the world agreed: every child has the RIGHT to an education. And with rights come duties.'",
    teaching: [
      "Rights are things every person deserves simply because they are human",
      "Duties are responsibilities we have toward other people and our community",
      "Rights and duties always go together — you cannot have one without the other",
      "The UN Convention on the Rights of the Child lists 54 rights for every child on Earth",
      "Rights include: education, healthcare, safety, clean water, and free speech",
      "Duties include: studying hard, following rules, respecting others, and protecting the environment"
    ],
    vocab: [
      { en: "Rights",        id: "Hak" },
      { en: "Duties",        id: "Kewajiban" },
      { en: "Responsibility", id: "Tanggung jawab" },
      { en: "Citizen",       id: "Warga negara" },
      { en: "Fairness",      id: "Keadilan" },
      { en: "Community",     id: "Komunitas" }
    ],
    activity: "Make Olivia's Rights and Duties Booklet! Fold 3 pages — on each page, draw one right on the left side and its matching duty on the right side.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "rights_match"
  },
  27: {
    story: "'Papa, can we watch the Saman dance video again?' Olivia's eyes are wide with wonder. 'How do all those people move exactly the same way?' Papa smiles. 'Years of practice — and deep pride in their culture.'",
    teaching: [
      "Indonesia has over 3,000 traditional dances — one of the richest dance cultures in the world",
      "Saman dance from Aceh: incredibly fast synchronised hand claps and movements by large groups",
      "Kecak dance from Bali: men chant 'cak-cak-cak' while telling the Ramayana story — no instruments!",
      "Pendet dance from Bali: women perform a sacred welcoming dance carrying flower offerings",
      "Reog Ponorogo from East Java: spectacular with a giant tiger-peacock mask weighing up to 50kg",
      "Traditional dances preserve Indonesia's history, religion, and stories for future generations"
    ],
    vocab: [
      { en: "Dance",         id: "Tari" },
      { en: "Traditional",   id: "Tradisional" },
      { en: "Culture",       id: "Budaya" },
      { en: "Performance",   id: "Pertunjukan" },
      { en: "Costume",       id: "Kostum" },
      { en: "Ceremony",      id: "Upacara" }
    ],
    activity: "Learn one move from Saman! Watch a video of Saman dance with Papa and copy the hand-clapping rhythm together. Culture lives in our hands and hearts!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "dance_match"
  },
  28: {
    story: "'Papa, there was rubbish all over the beach today.' Olivia looks sad. 'Can we fix it?' Papa nods. 'Absolutely. And it starts with three magic words: Reduce, Reuse, Recycle.'",
    teaching: [
      "Our planet is getting warmer because of pollution — we must all work together to protect it",
      "REDUCE means using less — less electricity, less water, less plastic, less waste",
      "REUSE means using things again instead of throwing them away",
      "RECYCLE means turning old materials (paper, glass, metal, plastic) into new things",
      "Small everyday actions add up — one person's habits multiplied by billions makes a huge difference",
      "Indonesia produces 6.8 million tonnes of plastic waste per year — we can help change that!"
    ],
    vocab: [
      { en: "Reduce",     id: "Kurangi" },
      { en: "Reuse",      id: "Gunakan kembali" },
      { en: "Recycle",    id: "Daur ulang" },
      { en: "Pollution",  id: "Polusi" },
      { en: "Environment", id: "Lingkungan" },
      { en: "Waste",      id: "Sampah" }
    ],
    activity: "Olivia's Eco Challenge! For one whole day, count how many times you Reduce, Reuse, or Recycle something. Keep a tally and share your score with Papa!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month4.pdf",
    game_type: "3r_sort"
  },

  // ── MONTH 5 — Humans and Stories ─────────────────────────────────────────

  29: {
    story: "'Papa, we live on an island, right?' Olivia asks. Papa nods. 'Not just any island — we live in the world's largest archipelago. Indonesia has over 17,000 islands!' Olivia's jaw drops. 'That's so many!'",
    teaching: [
      "Indonesia is the world's largest archipelago — a group of islands — with over 17,000 islands",
      "Indonesia spans 5,100 km from east to west — wider than the continental United States!",
      "Kalimantan (Borneo) is the largest Indonesian island — the 3rd largest island in the world",
      "Indonesia has extraordinary biodiversity — home to orangutans, Komodo dragons, Sumatran tigers, and thousands of unique species",
      "Indonesia is on the 'Ring of Fire' — it has over 130 active volcanoes!",
      "An endemic species lives only in one specific place — Indonesia has thousands of endemic plants and animals"
    ],
    vocab: [
      { en: "Archipelago",  id: "Kepulauan" },
      { en: "Biodiversity", id: "Keanekaragaman hayati" },
      { en: "Volcano",      id: "Gunung berapi" },
      { en: "Endemic",      id: "Endemik" },
      { en: "Rainforest",   id: "Hutan hujan" },
      { en: "Island",       id: "Pulau" }
    ],
    activity: "Draw Indonesia's Big Five! Draw the Komodo dragon, orangutan, Sumatran tiger, Birds of Paradise, and proboscis monkey — and write one fact about each.",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "island_label"
  },
  30: {
    story: "'Papa, who was the most creative person who ever lived?' Papa thinks carefully. 'That's a hard question. But during the Renaissance, there were so many geniuses — artists, scientists, and writers all at once!'",
    teaching: [
      "The Renaissance (1300s–1600s) was a great burst of art, science, and learning that began in Italy",
      "Leonardo da Vinci painted the Mona Lisa AND designed flying machines, robots, and tanks — 500 years before they were built!",
      "Michelangelo spent 4 years lying on his back to paint the Sistine Chapel ceiling",
      "Galileo Galilei improved the telescope and proved that Earth orbits the Sun",
      "Johannes Gutenberg invented the printing press (~1440) — making it possible to print books quickly and spread knowledge worldwide",
      "The Renaissance was triggered by the rediscovery of ancient Greek and Roman ideas about art, philosophy, and science"
    ],
    vocab: [
      { en: "Renaissance",  id: "Renaisans" },
      { en: "Genius",       id: "Jenius" },
      { en: "Invention",    id: "Penemuan" },
      { en: "Masterpiece",  id: "Mahakarya" },
      { en: "Telescope",    id: "Teleskop" },
      { en: "Printing press", id: "Mesin cetak" }
    ],
    activity: "Be like da Vinci! Choose one thing you want to invent — draw it, label all its parts, and explain how it would work. Think boldly!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "inventor_match"
  },
  31: {
    story: "'Papa, how many planets are there?' Olivia looks up at the night sky. 'Eight,' Papa says softly. 'Each one spinning in a perfect orbit around our Sun. Let's meet them all.'",
    teaching: [
      "Our solar system has 8 planets — all orbiting (going around) the Sun",
      "Order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
      "Jupiter is the largest planet — 1,300 Earths could fit inside it!",
      "Saturn has magnificent rings made of ice and rock — and is so light it would float on water",
      "Earth is the only known planet with liquid water, oxygen, and life",
      "A helpful saying: 'My Very Energetic Mother Just Served Us Noodles' — first letters = planet names in order!"
    ],
    vocab: [
      { en: "Planet",       id: "Planet" },
      { en: "Orbit",        id: "Orbit" },
      { en: "Solar system", id: "Tata surya" },
      { en: "Gravity",      id: "Gravitasi" },
      { en: "Atmosphere",   id: "Atmosfer" },
      { en: "Galaxy",       id: "Galaksi" }
    ],
    activity: "Draw Olivia's Solar System! Using a large piece of paper, draw the Sun in the centre and all 8 planets in order. Label each one with a fun fact!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "planet_order"
  },
  32: {
    story: "'Papa, what time is it?' Olivia points at the clock on the wall. 'Can you read it yourself?' Papa asks. Olivia squints at the hands. 'That's what we're going to learn today!'",
    teaching: [
      "A clock has a short hand (hour hand) and a long hand (minute hand)",
      "The short hand shows the HOUR — there are 12 numbers on a clock",
      "The long hand shows the MINUTES — one full circle = 60 minutes = 1 hour",
      "When the long hand points to 12, it is exactly o'clock (no extra minutes)",
      "When the long hand points to 6, it means 30 minutes past — we say 'half past'",
      "There are 24 hours in a day — morning hours are AM, afternoon/evening hours are PM"
    ],
    vocab: [
      { en: "Hour",    id: "Jam" },
      { en: "Minute",  id: "Menit" },
      { en: "Second",  id: "Detik" },
      { en: "Morning", id: "Pagi" },
      { en: "Noon",    id: "Siang" },
      { en: "Clock",   id: "Jam dinding" }
    ],
    activity: "Make Olivia's Paper Clock! Cut two hands from cardboard, attach with a brad fastener to a paper plate. Write the numbers and practise setting different times!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "clock_reading"
  },
  33: {
    story: "'Papa, what's the difference between a President and a King?' Olivia asks at breakfast. Papa puts down his coffee. 'Another great question! Let's explore how countries choose their leaders.'",
    teaching: [
      "Different countries have different types of leaders — and different ways of choosing them",
      "A President is elected (chosen by public vote) — like Indonesia's Presiden",
      "A Prime Minister leads a parliamentary government — like in the UK, Australia, and Malaysia",
      "A King or Queen leads a monarchy — power is inherited within a royal family",
      "A Mayor runs a city; a Governor runs a province",
      "Nelson Mandela, Soekarno, and Mahatma Gandhi are famous leaders known for courage, sacrifice, and serving their people"
    ],
    vocab: [
      { en: "President",      id: "Presiden" },
      { en: "Government",     id: "Pemerintah" },
      { en: "Election",       id: "Pemilihan" },
      { en: "Parliament",     id: "Parlemen" },
      { en: "Monarchy",       id: "Monarki" },
      { en: "Leader",         id: "Pemimpin" }
    ],
    activity: "Design Olivia's Ideal Leader! Write or draw what qualities the perfect leader should have — honest? courageous? kind? fair? — and give them a name!",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "leader_match"
  },
  34: {
    story: "'Papa, tell me a story!' Olivia cuddles up. 'Better than that,' Papa says, 'let's discover stories from around the world — tales that have been told for hundreds of years.'",
    teaching: [
      "Every culture on Earth has its own folktales — stories passed down through generations",
      "Folktales teach important values like honesty, kindness, courage, and humility",
      "Malin Kundang (Indonesia) — a son who denied his poor mother and was turned to stone",
      "Kancil stories (Indonesia) — the clever mouse-deer who uses wit to outsmart larger animals",
      "Cinderella exists in over 500 different versions across cultures from Europe to Asia to Africa!",
      "The structure of most stories: a problem → attempts to solve it → a resolution and lesson"
    ],
    vocab: [
      { en: "Folktale",    id: "Cerita rakyat" },
      { en: "Moral",       id: "Pesan moral" },
      { en: "Character",   id: "Tokoh" },
      { en: "Setting",     id: "Latar" },
      { en: "Plot",        id: "Alur cerita" },
      { en: "Legend",      id: "Legenda" }
    ],
    activity: "Write Olivia's Own Folktale! Choose an animal character, give them a problem to solve, and write or draw the 4 steps of their story. What is the moral?",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "story_sequence"
  },
  35: {
    story: "'Papa, I can't open this jar!' Olivia strains and strains. 'Don't give up,' Papa says. 'Think — what are all the different ways you could open it?' Olivia thinks... then gets a cloth for grip. It opens!",
    teaching: [
      "Problem solving means finding the best solution when faced with a challenge",
      "Step 1: Understand the problem — what exactly is wrong?",
      "Step 2: Think of different possible solutions — at least 2 or 3!",
      "Step 3: Choose the best solution and try it",
      "Step 4: If it doesn't work, learn from it and try a different approach",
      "Good problem-solvers are patient, creative, and not afraid of making mistakes"
    ],
    vocab: [
      { en: "Problem",      id: "Masalah" },
      { en: "Solution",     id: "Solusi" },
      { en: "Challenge",    id: "Tantangan" },
      { en: "Strategy",     id: "Strategi" },
      { en: "Patience",     id: "Kesabaran" },
      { en: "Perseverance", id: "Ketekunan" }
    ],
    activity: "Olivia's Problem Journal! Find one real problem in your day — big or small — and write 3 different ways you could solve it. Which one did you choose and why?",
    worksheet_url: "https://hqlryqbsymibzgmwnrse.supabase.co/storage/v1/object/public/worksheets/month5.pdf",
    game_type: "scenario_sort"
  }
};
