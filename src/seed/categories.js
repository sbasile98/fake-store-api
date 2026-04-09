const categories = [
  { name: 'Elettronica', slug: 'elettronica', image: 'https://picsum.photos/seed/electronics/400/300' },
  { name: 'Abbigliamento', slug: 'abbigliamento', image: 'https://picsum.photos/seed/clothing/400/300' },
  { name: 'Libri', slug: 'libri', image: 'https://picsum.photos/seed/books/400/300' },
  { name: 'Casa e Cucina', slug: 'casa-cucina', image: 'https://picsum.photos/seed/home/400/300' },
  { name: 'Sport e Outdoor', slug: 'sport-outdoor', image: 'https://picsum.photos/seed/sports/400/300' },
  { name: 'Bellezza e Cura della Persona', slug: 'bellezza-cura-persona', image: 'https://picsum.photos/seed/beauty/400/300' }
];

function seedCategories(db) {
  const insert = db.prepare('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)');
  for (const cat of categories) {
    insert.run(cat.name, cat.slug, cat.image);
  }
  console.log(`  ✓ ${categories.length} categorie inserite`);
}

module.exports = seedCategories;
