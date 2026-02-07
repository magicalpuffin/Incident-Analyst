import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  fixInput: string
  setFixInput: (value: string) => void
  newLogs: string
  setNewLogs: (value: string) => void
  handleApplyFix: () => void
  handleResolveIncident: () => void
  loading: boolean
}

export function ChatInput({
  fixInput,
  setFixInput,
  newLogs,
  setNewLogs,
  handleApplyFix,
  handleResolveIncident,
  loading,
}: ChatInputProps) {
  return (
    <div className="grid gap-2">
      <Textarea
        placeholder="Describe the fix you applied..."
        value={fixInput}
        onChange={(e) => setFixInput(e.target.value)}
        disabled={loading}
      />
      <Input
        placeholder="New logs after fix (optional)..."
        value={newLogs}
        onChange={(e) => setNewLogs(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-2">
        <Button onClick={handleApplyFix} disabled={loading || !fixInput.trim()}>
          {loading ? 'Processing...' : 'Apply Fix & Re-evaluate'}
        </Button>
        <Button onClick={handleResolveIncident} disabled={loading} variant="secondary">
          Mark Resolved
        </Button>
      </div>
    </div>
  )
}
