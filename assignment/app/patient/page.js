"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from "next/link"
import { Check } from 'lucide-react'
import { Button } from "@radix-ui/themes"
import React from "react"
import toast from 'react-hot-toast';

const schema = z.object({
  patName: z.string().optional(),
  patEmail: z.string().optional(),
  patPhone: z.string().optional(),
  patDocName: z.string().optional(),
  patAppDate: z.string().optional(),
  patDis: z.string().optional(),
  termsAccepted: z.boolean().optional(),
  privacyAccepted: z.boolean().optional(),
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

const Patient = () => {
  const [IsLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, setError, clearErrors, getValues, reset } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      patName: '',
      patEmail: '',
      patPhone: '',
      patDocName: '',
      patAppDate: '',
      patDis: '',
      termsAccepted: false,
      privacyAccepted: false,
    }
  })

  const validStep = (data) => {
    clearErrors()
    let isValid = true
    if (!data.patName || data.patName.length < 3) {
      setError('patName', { message: 'Patient name must be at least 3 characters' })
      isValid = false
    }
    if (!data.patEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.patEmail)) {
      setError('patEmail', { message: 'Enter valid email' })
      isValid = false
    }
    if (!data.patPhone || !/^\d{10}$/.test(data.patPhone)) {
      setError('patPhone', { message: 'Enter valid 10-digit mobile number' })
      isValid = false
    }
    if (!data.patAppDate) {
      setError('patAppDate', { message: 'Appointment Date is required' })
      isValid = false
    }
    if (!data.patDocName) {
      setError('patDocName', { message: 'Doctor name is required' })
      isValid = false
    }
    if (!data.patDis) {
      setError('patDis', { message: 'Disease Name is required' })
      isValid = false
    }
    if (!data.termsAccepted) {
      setError('termsAccepted', { message: 'You must accept terms and conditions' });
      isValid = false;
    }
    if (!data.privacyAccepted) {
      setError('privacyAccepted', { message: 'You must accept privacy policy' });
      isValid = false;
    }
    return isValid
  }

  const Login = async (data) => {
    const isValid = validStep(data)
    if (!isValid) {
      return
    }
    setIsLoading(true);
    const submit_promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const result = await res.json();
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
        success: 'Completed',
        error: (err) => `Error: ${err.message}`,
      }
    ).then(() => {
      setTimeout(() => {
        reset()
        setIsLoading(false)
      }, 2000);
    }).catch((error) => {
      console.error('error:', error)
      setIsLoading(false);
    }
    )

  }

  return (
    <div className="w-full min-h-screen px-4 py-8 md:py-12 flex justify-center items-center">
      <form onSubmit={handleSubmit((data) => Login(data))} className="w-full max-w-6xl flex justify-center items-center flex-col">

        <h2 className="text-2xl md:text-3xl lg:text-4xl text-blue-600 font-bold text-center mb-2">Welcome In Patient Support</h2>
        <span className="text-xs md:text-sm text-gray-600 text-center mb-6 md:mb-8">Please fill out the form our experts will contact you shortly</span>

        <div className="w-full flex justify-center items-start">

          <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4">
            <div className="w-full lg:w-1/2 flex justify-center items-center flex-col">
              <InputField label="Enter Your name" error={errors.patName} required>
                <input
                  type="text"
                  {...register("patName")}
                  placeholder="Enter your Full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Enter Your Email" error={errors.patEmail} required>
                <input
                  type="email"
                  {...register("patEmail")}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Enter Your Phone Number" error={errors.patPhone} required>
                <input
                  type="tel"
                  {...register("patPhone")}
                  placeholder="Enter your Phone Number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Enter Your Doctor Name" error={errors.patDocName} required>
                <input
                  type="text"
                  {...register("patDocName")}
                  placeholder="Enter your Doctor Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center flex-col">
              <InputField label="Enter Your Appointment Date" error={errors.patAppDate} required>
                <input
                  type="date"
                  {...register("patAppDate")}
                  placeholder="Enter your Appointment Date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <InputField label="Enter Your Disease" error={errors.patDis} required>
                <input
                  type="text"
                  {...register("patDis")}
                  placeholder="Enter your Disease Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </InputField>

              <div className="mt-4 md:mt-8 space-y-4 bg-gray-50 p-4 md:p-6 rounded-lg border-2 border-gray-200 w-full mx-2">
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

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    {...register("privacyAccepted")}
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    I accept the <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link> *
                  </span>
                </label>
                {errors.privacyAccepted && <p className="text-sm text-red-600 ml-8">{errors.privacyAccepted.message}</p>}
              </div>

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

export default Patient