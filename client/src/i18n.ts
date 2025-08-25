import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      brand: 'BD Shop',
      nav: { products: 'Products', cart: 'Cart', account: 'Account' },
      home: {
        headline: 'Premium Apparel & Shoes',
        sub: 'Discover curated collections for Bangladesh. Fast delivery nationwide.',
        newArrivals: 'New Arrivals',
        bestSellers: 'Best Sellers',
        budget: 'Budget Friendly',
      },
    },
  },
  bn: {
    translation: {
      brand: 'বিডি শপ',
      nav: { products: 'পণ্য', cart: 'কার্ট', account: 'অ্যাকাউন্ট' },
      home: {
        headline: 'প্রিমিয়াম পোশাক ও জুতা',
        sub: 'বাংলাদেশের জন্য বাছাইকৃত কালেকশন। সারাদেশে দ্রুত ডেলিভারি।',
        newArrivals: 'নতুন কালেকশন',
        bestSellers: 'সর্বাধিক বিক্রিত',
        budget: 'বাজেট ফ্রেন্ডলি',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n

