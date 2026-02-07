const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Analysis {
  incident_id: number
  status: string
  suspected_root_causes: string[]
  suggested_fix: string
  confidence: string
  explanation: string
  similar_incidents: Array<{
    id: number
    logs_preview: string
    resolution: string
    root_causes: string[]
  }>
  attempted_fixes: Array<{
    fix: string
    applied_at: string
  }>
}

export interface ActionResult {
  incident_id: number
  status: string
  evaluation: {
    likely_resolved: boolean
    remaining_concerns: string[]
    next_steps: string
    recommendation: string
  }
  next_suggestion?: {
    suspected_root_causes: string[]
    suggested_fix: string
    confidence: string
    explanation: string
  }
}

export const submitIncident = async (logs: string, metrics: string): Promise<Analysis> => {
  const response = await fetch(`${API_URL}/incident`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logs, metrics }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze incident')
  }

  return response.json()
}

export const applyFix = async (incident_id: number, fix_applied: string, new_logs: string): Promise<ActionResult> => {
  const response = await fetch(`${API_URL}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      incident_id,
      fix_applied,
      new_logs,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to record action')
  }

  return response.json()
}

export const resolveIncident = async (incident_id: number, resolution_notes: string): Promise<void> => {
  const response = await fetch(`${API_URL}/resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      incident_id,
      resolution_notes,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to resolve incident')
  }
}
