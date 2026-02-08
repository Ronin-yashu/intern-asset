"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from "next/link"
import { Check } from 'lucide-react'
import { Button } from "@radix-ui/themes"
import React from "react"
import toast from 'react-hot-toast'

const schema = z.object({
  volName: z.string().optional(),
  volEmail: z.string().optional(),
  volPhone: z.string().optional(),
  volAvailability: z.string().optional(),
  termsAccepted: z.boolean().optional(),
})

const InputField = ({ label, error, children, required = false }) => (
  <div className="mb-4 md:mb-6 w-full px-2">
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

const Volunteer = () => {
  const [IsLoading, setIsLoading] = React.useState(false)
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      volName: '',
      volEmail: '',
      volPhone: '',
      volAvailability: '',
      termsAccepted: false,
    }
  })

  const validStep = (data) => {
    clearErrors()
    let isValid = true
    if (!data.volName || data.volName.length < 3) {
      setError('volName', { message: 'Name must be at least 3 characters' })
      isValid = false
    }
    if (!data.volEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.volEmail)) {
      setError('volEmail', { message: 'Enter valid email' })
      isValid = false
    }
    if (!data.volPhone || !/^\d{10}$/.test(data.volPhone)) {
      setError('volPhone', { message: 'Enter valid 10-digit mobile number' })
      isValid = false
    }
    if (!data.volAvailability) {
      setError('volAvailability', { message: 'Please select your availability' })
      isValid = false
    }
    if (!data.termsAccepted) {
      setError('termsAccepted', { message: 'You must accept terms and conditions' })
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
        const res = await fetch("/api/volunteer", {
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
        loading: 'Submitting...',
        success: 'Registration Completed',
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
    <div className="w-full min-h-screen px-4 py-8 md:py-12 flex justify-center items-center">
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data))} className="w-full max-w-2xl flex justify-center items-center flex-col">

        <h2 className="text-2xl md:text-3xl lg:text-4xl text-blue-600 font-bold text-center mb-2">Volunteer Registration</h2>
        <span className="text-xs md:text-sm text-gray-600 text-center mb-6 md:mb-8">Join our team and make a difference in your community</span>

        <div className="w-full flex justify-center items-start">
          <div className="w-full flex flex-col">
            
            <InputField label="Enter Your Name" error={errors.volName} required>
              <input
                type="text"
                {...register("volName")}
                placeholder="Enter your Full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </InputField>

            <InputField label="Enter Your Email" error={errors.volEmail} required>
              <input
                type="email"
                {...register("volEmail")}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </InputField>

            <InputField label="Enter Your Phone Number" error={errors.volPhone} required>
              <input
                type="tel"
                {...register("volPhone")}
                placeholder="Enter your Phone Number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </InputField>

            <InputField label="Select Your Availability" error={errors.volAvailability} required>
              <select
                {...register("volAvailability")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="">Select your availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both Weekdays & Weekends</option>
                <option value="flexible">Flexible</option>
              </select>
            </InputField>

            <div className="mt-4 md:mt-6 space-y-4 bg-gray-50 p-4 md:p-6 rounded-lg border-2 border-gray-200 w-full">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  {...register("termsAccepted")}
                  type="checkbox"
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  I accept the <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms and Conditions</Link> *
                </span>
              </label>
              {errors.termsAccepted && <p className="text-sm text-red-600 ml-8">{errors.termsAccepted.message}</p>}
            </div>

          </div>
        </div>

        <Button type="submit" size="3" disabled={IsLoading} className="flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-transform animate-pulse mt-6 md:mt-8">
          <Check size={20} /> Submit Registration
        </Button>
      </form>
    </div>
  )
}

export default Volunteer