"use client"


import { ChatInput } from "./chat-input"
import { useChat } from '@/lib/chat-context'
import { applyFix, resolveIncident } from '@/lib/api'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from 'lucide-react'

export function Chat() {
  const { analysis, actionResult, loading, setLoading, resolved, setResolved, setActionResult, setAnalysis } = useChat()
  const [fixInput, setFixInput] = useState('')
  const [newLogs, setNewLogs] = useState('')
  const [error, setError] = useState('')

  const handleApplyFix = async () => {
    if (!analysis || !fixInput.trim()) {
      setError('Please describe the fix you applied.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await applyFix(analysis.incident_id, fixInput, newLogs)
      setActionResult(result)
      setFixInput('')
      setNewLogs('')
      setAnalysis(prev => prev ? {
        ...prev,
        attempted_fixes: [...prev.attempted_fixes, { fix: fixInput, applied_at: new Date().toISOString() }]
      } : null)
    } catch (err) {
      setError('Failed to apply fix.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResolveIncident = async () => {
    if (!analysis) return

    setLoading(true)
    setError('')

    try {
      await resolveIncident(analysis.incident_id, fixInput || 'Resolved via suggested fixes')
      setResolved(true)
    } catch (err) {
      setError('Failed to resolve incident.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!analysis) return null

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xl font-semibold mb-4">Incident #{analysis.incident_id}</h3>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {resolved ? (
          <div className="text-center py-8">
            <RocketIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-lg font-semibold">Incident Resolved!</h4>
            <p className="text-muted-foreground">This incident has been stored in memory.</p>
          </div>
        ) : (
          <>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h4 className="font-semibold">Suspected Root Causes:</h4>
              <ul className="list-disc list-inside">
                {analysis.suspected_root_causes.map((cause, i) => (
                  <li key={i}>{cause}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-2">Suggested Fix:</h4>
              <p>{actionResult?.next_suggestion?.suggested_fix || analysis.suggested_fix}</p>
              <p className="text-sm text-muted-foreground mt-2">Confidence: {analysis.confidence}</p>
              <p className="text-sm text-muted-foreground">Explanation: {analysis.explanation}</p>
            </div>

            {actionResult && (
              <div className="bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-700">
                <h4 className="font-semibold">Agent Evaluation After Fix:</h4>
                <p>{actionResult.evaluation.next_steps}</p>
                {actionResult.evaluation.remaining_concerns.length > 0 && (
                  <p className="text-sm text-yellow-500 mt-2">
                    ⚠️ Remaining concerns: {actionResult.evaluation.remaining_concerns.join(', ')}
                  </p>
                )}
              </div>
            )}

            {analysis.similar_incidents.length > 0 && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h4 className="font-semibold">Similar Past Incidents:</h4>
                {analysis.similar_incidents.map((incident) => (
                  <div key={incident.id} className="border-b last:border-b-0 py-2">
                    <p className="text-sm font-semibold">Incident #{incident.id}</p>
                    <p className="text-xs text-muted-foreground">{incident.logs_preview}</p>
                  </div>
                ))}
              </div>
            )}

            {analysis.attempted_fixes.length > 0 && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h4 className="font-semibold">Attempted Fixes:</h4>
                {analysis.attempted_fixes.map((fix, i) => (
                  <div key={i} className="border-b last:border-b-0 py-2">
                    <p className="text-sm">{fix.fix}</p>
                    <p className="text-xs text-muted-foreground">{new Date(fix.applied_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {!resolved && (
        <div className="p-4 border-t bg-background">
          <ChatInput
            fixInput={fixInput}
            setFixInput={setFixInput}
            newLogs={newLogs}
            setNewLogs={setNewLogs}
            handleApplyFix={handleApplyFix}
            handleResolveIncident={handleResolveIncident}
            loading={loading}
          />
        </div>
      )}
    </div>
  )
}

