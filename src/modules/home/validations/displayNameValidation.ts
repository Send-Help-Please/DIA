export const validateDisplayName = (displayName: string) => {
    if(displayName.trim() === '') return 'Display name must be provided'
    if(displayName.length < 2) return 'Display name must be at least 2 characters long'
    if(displayName.length > 20) return 'Display name must be at most 20 characters long'
}