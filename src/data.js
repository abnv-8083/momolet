// =============================================
// MOMOLET — Static Content Data
// =============================================

import steamedMomos from './assets/steamed_momos.jpg';
import friedMomos from './assets/fried_momos.jpg';
import chickenCutlet from './assets/chicken_cutlet.jpg';
import vegCutlet from './assets/veg_cutlet.jpg';
import signatureSoup from './assets/signature_soup.jpg';
import specialCombo from './assets/special_combo.jpg';
import restaurantInterior from './assets/restaurant_interior.jpg';
import kitchenPassion from './assets/kitchen_passion.jpg';
import gallery1 from './assets/gallery1.jpg';
import gallery2 from './assets/gallery2.jpg';
import gallery3 from './assets/gallery3.jpg';
import gallery4 from './assets/gallery4.jpg';
import heroSpread from './assets/hero_food_spread.jpg';

export { heroSpread, restaurantInterior, kitchenPassion };

export const menuCategories = ['All', 'Momos', 'Cutlets', 'Soups', 'Combos'];

export const menuItems = [
  {
    id: 1,
    name: 'Steamed Momos',
    category: 'Momos',
    description: 'Classic hand-folded momos with our signature spiced filling, served with smoky tomato chutney.',
    price: '₹89',
    image: steamedMomos,
    tag: 'Bestseller',
    tagColor: 'bg-amber-400 text-amber-900',
  },
  {
    id: 2,
    name: 'Fried Momos',
    category: 'Momos',
    description: 'Golden crispy shells with juicy filling inside. Addictive. Irresistible. Every single time.',
    price: '₹99',
    image: friedMomos,
    tag: 'Fan Favourite',
    tagColor: 'bg-red-700 text-white',
  },
  {
    id: 3,
    name: 'Chicken Cutlet',
    category: 'Cutlets',
    description: 'Seasoned minced chicken shaped into perfection, breaded and pan-fried to golden glory.',
    price: '₹79',
    image: chickenCutlet,
    tag: 'Chef\'s Pick',
    tagColor: 'bg-orange-500 text-white',
  },
  {
    id: 4,
    name: 'Vegetable Cutlet',
    category: 'Cutlets',
    description: 'A garden-fresh blend of spiced vegetables, crispy on the outside, hearty on the inside.',
    price: '₹65',
    image: vegCutlet,
    tag: 'Veg',
    tagColor: 'bg-green-600 text-white',
  },
  {
    id: 5,
    name: 'Signature Soup',
    category: 'Soups',
    description: 'A soul-warming bowl of broth with tender noodles, fresh greens, and secret spices.',
    price: '₹75',
    image: signatureSoup,
    tag: 'Warming',
    tagColor: 'bg-teal-600 text-white',
  },
  {
    id: 6,
    name: 'MOMOLET Special Combo',
    category: 'Combos',
    description: 'Our ultimate sharing platter — steamed momos, cutlet, and signature soup. The full MOMOLET experience.',
    price: '₹199',
    image: specialCombo,
    tag: 'Value Combo',
    tagColor: 'bg-purple-700 text-white',
  },
];

export const outlets = [
  {
    id: 1,
    name: 'Manjeri',
    tagline: 'Where it all began',
    description: 'Our flagship outlet in the heart of Manjeri. Come for the momos, stay for the vibes.',
    address: 'Near Bus Stand, Manjeri, Kerala (Placeholder)',
    status: 'open',
    image: restaurantInterior,
  },
  {
    id: 2,
    name: 'Perinthalmanna',
    tagline: 'Your weekend favourite',
    description: 'Serving the bold flavours of MOMOLET to the people of Perinthalmanna since day one.',
    address: 'Main Road, Perinthalmanna, Kerala (Placeholder)',
    status: 'open',
    image: restaurantInterior,
  },
  {
    id: 3,
    name: 'Nilambur',
    tagline: 'Fresh in the forest town',
    description: 'Nestled in the scenic town of Nilambur, our outlet brings MOMOLET magic to a new crowd.',
    address: 'Town Centre, Nilambur, Kerala (Placeholder)',
    status: 'open',
    image: restaurantInterior,
  },
  {
    id: 4,
    name: 'Kondotty',
    tagline: 'Coming to your neighbourhood',
    description: 'We\'re cooking up something special for Kondotty. Stay tuned — big things are coming.',
    address: 'Location to be announced',
    status: 'coming-soon',
    image: restaurantInterior,
  },
];

export const galleryItems = [
  { id: 1, image: gallery1, alt: 'Momos in bamboo steamer', span: 'tall' },
  { id: 2, image: gallery2, alt: 'Momo being lifted with chopsticks', span: 'normal' },
  { id: 3, image: gallery3, alt: 'Friends enjoying momos together', span: 'wide' },
  { id: 4, image: gallery4, alt: 'Sauces and herbs flat lay', span: 'normal' },
  { id: 5, image: kitchenPassion, alt: 'Chef crafting momos in the kitchen', span: 'tall' },
  { id: 6, image: heroSpread, alt: 'MOMOLET food spread', span: 'wide' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Outlets', href: '#outlets' },
  { label: 'Contact', href: '#contact' },
];
