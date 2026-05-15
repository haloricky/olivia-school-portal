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
  }
};
