import React, { useState } from 'react'
import { Loader2, FileSpreadsheet, Lock, Eye, EyeOff, CalendarRange } from 'lucide-react'
import { getMonthlyPeriod } from '../utils/dateUtils'

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8n7exgoMInr7i-2nLusAKyuo6nqCXo985V9dBpwxYENmTIE_XMvX2yNoXfKKclicy/exec"

const MonthlyReport = () => {
    const [loading, setLoading] = useState(false)
    const [accessCode, setAccessCode] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    const today = new Date().toISOString().split('T')[0]
    const period = getMonthlyPeriod(today)

    const handleGenerateReport = async () => {
        if (accessCode !== 'Sisbech2026') {
            setMessage({ text: "Code d'accès incorrect ! 🔒", type: 'error' })
            return
        }

        setLoading(true)
        setMessage({ text: '', type: '' })

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generateReport',
                    periode: period.periodeKey,
                    label: period.label,
                    generatedAt: new Date().toISOString()
                })
            })

            setMessage({ text: 'Rapport généré dans Google Sheets ! 🚀', type: 'success' })
            setAccessCode('')
        } catch (error) {
            setMessage({ text: 'Erreur : ' + error.message, type: 'error' })
        } finally {
            setLoading(false)
            setTimeout(() => setMessage({ text: '', type: '' }), 4000)
        }
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft border border-gray-100 mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-50 rounded-lg">
                    <FileSpreadsheet className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text-main">Rapport de Transaction</h2>
                    <p className="text-xs text-text-muted font-medium">Générer un récapitulatif mensuel sur Google Sheets</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                    <CalendarRange className="w-4 h-4 text-text-muted" />
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Période actuelle</span>
                </div>
                <p className="text-sm font-extrabold text-teal-700">{period?.label}</p>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Lock className={`h-4 w-4 transition-colors ${accessCode ? 'text-teal-600' : 'text-gray-400'}`} />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Code de sécurité"
                        value={accessCode}
                        onChange={e => setAccessCode(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-600 transition-colors focus:outline-none cursor-pointer z-20"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>

                <button
                    onClick={handleGenerateReport}
                    disabled={loading}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                        <>
                            <span>GÉNÉRER LE RAPPORT TOTAL</span>
                            <FileSpreadsheet className="w-4 h-4" />
                        </>
                    )}
                </button>

                {message.text && (
                    <div className={`p-3 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600'}`}>
                        {message.type === 'error' ? '⚠️' : '✅'} {message.text}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MonthlyReport
