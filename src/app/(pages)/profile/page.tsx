'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { _makePostRequest } from '@/app/lib/api/api';
import { endpoints } from '@/app/lib/api/endpoints';
import toast from 'react-hot-toast';
import { profileSchema } from '@/app/lib/validations/ProfileSchema';



const Page = () => {
    const router = useRouter();

    const userString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = userString ? JSON.parse(userString) : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!user && token) {
        router.push("/Login");
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profileSchema),
    });

    const onSubmit = async (data: any) => {
        console.log("Price submitted:", data);
        try {
            const res = await _makePostRequest(endpoints.PROFILE.UPDATE, {
                ...data, email: user.email
            })
            if (res.status === 200) {
                reset();
                toast.success("Your profile was updated successfully");

            }
        } catch (error) {

        }
    };

    return (
        <section className="container flex items-center justify-center bg-[#111111] px-4 py-10 min-h-screen">
            <div className="max-w-5xl w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-3 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00c37a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Your Profile</h2>
                    <p className="text-[#00c37a] text-sm">Manage your account information</p>
                </div>

                <div className="text-center mb-6">
                    <div className="text-xl font-semibold text-white">Welcome {user?.name}</div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    {/* Read-only fields */}
                    {[
                        { label: 'Full Name', value: user?.name, id: 'name' },
                        { label: 'Email', value: user?.email, id: 'email' },
                        { label: 'Phone', value: user?.phone_number, id: 'phone' },
                        { label: 'Role', value: user?.role === "user" ? "Patient" : "Doctor", id: 'role' },
                        ...(user?.role === "doctor" ? [
                            { label: 'Specialization', value: user?.specialization, id: 'specialization' },
                            { label: 'Experience', value: user?.experience, id: 'experience' },
                            { label: 'License No', value: user?.license, id: 'license' },
                        ] : []),
                    ].map(({ label, value, id }) => (
                        <div className="space-y-2" key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
                            <input
                                type="text"
                                id={id}
                                value={value}

                                readOnly
                                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
                            />
                        </div>
                    ))}

                    {/* Editable Fields for verified doctor */}
                    {user?.role === "doctor" && user?.verified && (
                        <>
                            <div className="col-span-full border-t border-[#08392e]/50 pt-6">
                                <h3 className="text-lg font-semibold text-[#00c37a] mb-4">Pricing Information</h3>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="offlinePrice" className="block text-sm font-medium text-gray-300">Offline Session Price</label>
                                <input
                                    type="text"
                                    id="offlinePrice"
                                    {...register("offlinePrice")}
                                    placeholder="e.g. ₹500"
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
                                />
                                {errors.offlinePrice && (
                                    <p className="text-sm text-red-500">{errors.offlinePrice.message as string}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="onlinePrice" className="block text-sm font-medium text-gray-300">Online Price (per min)</label>
                                <input
                                    type="text"
                                    id="onlinePrice"
                                    {...register("onlinePrice")}
                                    placeholder="e.g. ₹10/min"
                                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
                                />
                                {errors.onlinePrice && (
                                    <p className="text-sm text-red-500">{errors.onlinePrice.message as string}</p>
                                )}
                            </div>
                        </>
                    )}

                    <div className="col-span-full pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                        >
                            Update Profile
                            <svg className="ml-2 -mr-1 inline w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Page;
