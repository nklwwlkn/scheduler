export function connect(relationId: string | null) {
  if (!relationId) return
  return { connect: { id: relationId } }
}
