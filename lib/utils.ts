import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function getPlaceholderImage(width: number = 400, height: number = 600): string {
  // Curated luxury women's fashion images
  const luxuryWomenImages = [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop', // Evening gown
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop', // Designer coat
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop', // Cocktail dress
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop', // Blazer
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop', // Elegant blouse
    'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop', // Designer handbag
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop', // Luxury accessories
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop', // Fashion model
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop', // Designer clothing
  ]
  
  const randomImage = luxuryWomenImages[Math.floor(Math.random() * luxuryWomenImages.length)]
  return `${randomImage}&w=${width}&h=${height}&q=80`
}

// Lebanese-specific utility functions
export function calculateLebaneseTax(subtotal: number, country: string): number {
  // 11% VAT for Lebanese customers
  if (country === 'LB') {
    return subtotal * 0.11
  }
  return 0
}

export function calculateLebaneseshipping(subtotal: number, country: string, governorate?: string): number {
  // Free shipping over $150 within Lebanon
  if (country === 'LB') {
    if (subtotal >= 150) {
      return 0
    }
    // Standard shipping within Lebanon
    return 15
  }
  
  // International shipping
  return 25
}

export function formatLebaneseCurrency(amount: number, currency: 'USD' | 'LBP' = 'USD'): string {
  if (currency === 'LBP') {
    return new Intl.NumberFormat('ar-LB', {
      style: 'currency',
      currency: 'LBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  return formatPrice(amount)
}

export function convertUSDToLBP(usdAmount: number, rate: number = 89000): number {
  return Math.round(usdAmount * rate)
}

export function convertLBPToUSD(lbpAmount: number, rate: number = 89000): number {
  return Math.round((lbpAmount / rate) * 100) / 100
} 