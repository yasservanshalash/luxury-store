'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  const total = getTotalPrice()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                      <Dialog.Title className="text-2xl font-thin tracking-wider text-gray-900">
                        YOUR BAG
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 font-light tracking-wide mb-6">
                            Your bag is currently empty
                          </p>
                          <Link
                            href="/products"
                            onClick={onClose}
                            className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
                          >
                            Continue Shopping
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {items.map((item) => (
                            <div key={`${item.id}-${item.selectedVariant?.id || 'no-variant'}`} className="flex space-x-4">
                              <div className="relative w-20 h-24 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-light text-gray-900 tracking-wide">
                                  {item.name}
                                </h4>
                                
                                {item.selectedVariant && (
                                  <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">
                                    {item.selectedVariant.name}: {item.selectedVariant.value}
                                  </p>
                                )}
                                
                                <p className="text-sm font-light text-gray-900 mt-2">
                                  ${item.price}
                                </p>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center mt-3">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.selectedVariant?.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    −
                                  </button>
                                  <span className="px-4 text-sm font-light">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.selectedVariant?.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                  >
                                    +
                                  </button>
                                  
                                  <button
                                    onClick={() => removeItem(item.id, item.selectedVariant?.id)}
                                    className="ml-4 text-xs text-gray-400 hover:text-gray-600 tracking-wider uppercase transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-100 px-6 py-6">
                        <div className="flex justify-between text-lg font-light mb-6">
                          <span className="tracking-wider uppercase">Total</span>
                          <span className="font-light">${total.toFixed(2)}</span>
                        </div>
                        
                        <div className="space-y-3">
                          <Link
                            href="/checkout"
                            onClick={onClose}
                            className="w-full bg-gray-900 text-white py-4 text-center text-sm font-light tracking-wider uppercase hover:bg-gray-800 transition-colors duration-300 block"
                          >
                            Proceed to Checkout
                          </Link>
                          
                          <button
                            onClick={onClose}
                            className="w-full border border-gray-300 text-gray-900 py-4 text-center text-sm font-light tracking-wider uppercase hover:bg-gray-50 transition-colors duration-300"
                          >
                            Continue Shopping
                          </button>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <p className="text-xs text-gray-500 font-light tracking-wide">
                            Free shipping on orders over $200
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 