"use client"

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { submitIncident } from '@/lib/api'
import { useChat } from '@/lib/chat-context'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from 'lucide-react'

export function IncidentForm() {
  const [logs, setLogs] = useState('')
  const [metrics, setMetrics] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setAnalysis } = useChat()

  const handleSubmit = async () => {
    if (!logs.trim()) {
      setError('Please enter log data.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await submitIncident(logs, metrics)
      setAnalysis(result)
      setLogs('')
      setMetrics('')
    } catch (err) {
      setError('Failed to analyze incident. Please check the backend server.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Submit Incident</h2>
      <div className="grid gap-4 flex-grow">
        <div>
          <Label htmlFor="logs">System Logs</Label>
          <Textarea
            id="logs"
            placeholder="Paste your error logs here..."
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
            rows={10}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="metrics">Additional Metrics (optional)</Label>
          <Textarea
            id="metrics"
            placeholder="CPU: 85%&#10;Memory: 512Mi/512Mi"
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
            rows={5}
            disabled={loading}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={loading || !logs.trim()}
        className="w-full mt-4"
      >
        {loading ? 'Analyzing...' : 'Analyze Incident'}
      </Button>
    </div>
  )
}
