import React from 'react'
import { useState } from 'react'
import { Logo } from '../../assets'
import Api from '../../Api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()
    const navigate = useNavigate()

    const register = async () => {
        const data = {
            role: role,
            username: email,
            password: password
        }
        console.log(data)
        try {
            const response = await Api.Register(data)
            console.log(response, 'post response')
            toast.success('Berhasil Create Akun, Silahkan Login untuk Masuk ke Dashboard!')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto min-h-screen">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className=" flex items-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sinar Akbar Dental Clinic
                            <img className="w-20  h-20 rounded-full mr-2" src={Logo} alt="logo" />
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <select  onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username...">
                                    <option value="">Select Role</option>
                                    <option value="petugas">Petugas</option>
                                    <option value="dokter">Dokter</option>
                                </select>
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username..." required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6" required="" />
                            </div>
                            <button onClick={register} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
