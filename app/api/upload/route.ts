import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert file to base64 data URL for immediate storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type
    const dataUrl = `data:${mimeType};base64,${base64}`
    
    // For now, we'll return the data URL directly
    // This allows immediate preview and storage without file system issues
    // In production, you should upload to Cloudinary, AWS S3, or similar service
    
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    
    // You can store the actual file if needed, but data URLs work for immediate use
    const imageUrl = dataUrl
    
    // Here's how you would upload to Cloudinary:
    /*
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
    
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', file)
    cloudinaryFormData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!)
    cloudinaryFormData.append('folder', 'luxury-store/products')
    
    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    })
    
    if (!cloudinaryResponse.ok) {
      throw new Error('Failed to upload to Cloudinary')
    }
    
    const cloudinaryData = await cloudinaryResponse.json()
    const imageUrl = cloudinaryData.secure_url
    */

    console.log('Upload successful, returning URL:', imageUrl.substring(0, 50) + '...')
    
    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      url: imageUrl
    })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    )
  }
} 