import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function getImagePlaceholder(width: number, height: number) {
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`
}

// Lebanese-specific utility functions
export function calculateLebaneseTax(subtotal: number, country: string): number {
  if (country === 'LB') {
    return subtotal * 0.11 // 11% VAT in Lebanon
  }
  return subtotal * 0.05 // Default for other countries
}

export function calculateLebaneseshipping(subtotal: number, country: string, governorate: string): number {
  if (subtotal >= 150 && country === 'LB') return 0 // Free shipping over $150 in Lebanon
  
  if (country === 'LB') {
    if (governorate === 'Beirut' || governorate === 'Mount Lebanon') return 5
    return 8 // Other Lebanese governorates
  }
  
  // Regional Middle East shipping
  if (['AE', 'SA', 'JO', 'SY', 'TR', 'CY', 'QA', 'KW'].includes(country)) return 25
  
  return 45 // International shipping
}

export function formatPhoneNumber(phone: string, country: string = 'LB'): string {
  if (country === 'LB') {
    // Lebanese phone number formatting
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('961')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    }
    if (cleaned.startsWith('0')) {
      return `+961 ${cleaned.slice(1, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
    }
    return `+961 ${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4)}`
  }
  return phone
} 