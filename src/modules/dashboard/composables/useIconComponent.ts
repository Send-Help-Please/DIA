import { getIconByName } from '@/utils/lucideIconMap';

export function useIconComponent(name: string) {
    return getIconByName(name);
}
