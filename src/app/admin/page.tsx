import RadioManager from '@/components/RadioManager'
import { Toaster } from 'react-hot-toast'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto">
        <RadioManager />
      </div>
      <Toaster position="top-right" />
    </main>
  )
} 