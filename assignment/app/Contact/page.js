"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@radix-ui/themes"
import React from "react"
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
})

const InputField = ({ label, error, children, required = false }) => (
  <div className="mb-4 md:mb-6 w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-shake">
        <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
        {error.message}
      </p>
    )}
  </div>
)

const ContactUs = () => {
  const [IsLoading, setIsLoading] = React.useState(false)
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }
  })

  const validStep = (data) => {
    clearErrors()
    let isValid = true
    if (!data.name || data.name.length < 3) {
      setError('name', { message: 'Name must be at least 3 characters' })
      isValid = false
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError('email', { message: 'Enter valid email' })
      isValid = false
    }
    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
      setError('phone', { message: 'Enter valid 10-digit mobile number' })
      isValid = false
    }
    if (!data.subject || data.subject.length < 5) {
      setError('subject', { message: 'Subject must be at least 5 characters' })
      isValid = false
    }
    if (!data.message || data.message.length < 10) {
      setError('message', { message: 'Message must be at least 10 characters' })
      isValid = false
    }
    return isValid
  }

  const handleSubmitForm = async (data) => {
    const isValid = validStep(data)
    if (!isValid) {
      return
    }
    setIsLoading(true)
    const submit_promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const result = await res.json()
        if (res.ok) {
          resolve(result)
        } else {
          reject(new Error(result.error || 'something went wrong'))
        }
      } catch (error) {
        reject(error)
      }
    })
    toast.promise(
      submit_promise,
      {
        loading: 'Sending...',
        success: 'Message Sent Successfully',
        error: (err) => `Error: ${err.message}`,
      }
    ).then(() => {
      setTimeout(() => {
        reset()
        setIsLoading(false)
      }, 2000)
    }).catch((error) => {
      console.error('error:', error)
      setIsLoading(false)
    })
  }

  return (
    <div className="w-full min-h-screen px-4 py-8 md:py-12 flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-6xl">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-blue-600 font-bold mb-2">Contact Us</h2>
          <span className="text-xs md:text-sm text-gray-600">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">support@hospital.com</p>
                    <p className="text-gray-600">info@hospital.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 1234567890</p>
                    <p className="text-gray-600">+91 0987654321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">123 Healthcare Street</p>
                    <p className="text-gray-600">Medical District, City 123456</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-semibold text-gray-800 mb-2">Office Hours</h4>
                <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-gray-600 text-sm">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit((data) => handleSubmitForm(data))} className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Send Message</h3>

              <InputField label="Your Name" error={errors.name} required>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Your Email" error={errors.email} required>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Your Phone" error={errors.phone} required>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Subject" error={errors.subject} required>
                <input
                  type="text"
                  {...register("subject")}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Message" error={errors.message} required>
                <textarea
                  {...register("message")}
                  placeholder="Enter your message"
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                />
              </InputField>

              <Button type="submit" size="3" disabled={IsLoading} className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-transform">
                <Send size={20} /> Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs