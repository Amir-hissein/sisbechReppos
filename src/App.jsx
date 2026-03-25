import { useState, useEffect } from 'react'
import Header from './components/Header'
import TransactionForm from './components/TransactionForm'
import MonthlyReport from './components/MonthlyReport'

function App() {
  const [exchangeRate, setExchangeRate] = useState(655)
  const [activeCurrency, setActiveCurrency] = useState('USD') // 'USD' or 'FCFA'

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Header exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} />

      <div className="mt-8 space-y-8">
        <TransactionForm
          activeCurrency={activeCurrency}
          setActiveCurrency={setActiveCurrency}
          exchangeRate={exchangeRate}
          onAddTransaction={() => { }} // No-op since tables are gone
        />

        <MonthlyReport />
      </div>
    </div>
  )
}

export default App
