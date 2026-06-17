import type { Component } from 'vue';
import {
    Apple,
    Bed,
    Bike,
    BookOpen,
    Brain,
    Briefcase,
    Brush,
    Camera,
    CircleHelp,
    Code,
    Coffee,
    Dumbbell,
    Footprints,
    Heart,
    Laptop,
    Moon,
    Music,
    Plane,
    Salad,
    Sunrise,
    Wallet,
    Utensils,
    Ban,
    Droplet,
    CalendarDays,
} from '@lucide/vue';

export type IconOption = {
    name: string;
    label: string;
    tags: string[];
    component: Component;
};

export const ICONS: IconOption[] = [
    {
        name: 'dumbbell',
        label: 'Dumbbell',
        tags: ['workout', 'exercise', 'gym', 'fitness', 'strength'],
        component: Dumbbell,
    },
    {
        name: 'bike',
        label: 'Bike',
        tags: ['cycling', 'cardio', 'exercise', 'sport'],
        component: Bike,
    },
    {
        name: 'book-open',
        label: 'Book Open',
        tags: ['reading', 'study', 'learning', 'education'],
        component: BookOpen,
    },
    {
        name: 'droplet',
        label: 'Droplet',
        tags: ['water', 'hydration', 'drink', 'health'],
        component: Droplet,
    },
    {
        name: 'moon',
        label: 'Moon',
        tags: ['sleep', 'night', 'rest'],
        component: Moon,
    },
    {
        name: 'brain',
        label: 'Brain',
        tags: ['focus', 'mind', 'mental', 'thinking'],
        component: Brain,
    },
    {
        name: 'heart',
        label: 'Heart',
        tags: ['health', 'love', 'wellness'],
        component: Heart,
    },
    {
        name: 'apple',
        label: 'Apple',
        tags: ['food', 'nutrition', 'diet', 'fruit'],
        component: Apple,
    },
    {
        name: 'coffee',
        label: 'Coffee',
        tags: ['drink', 'morning', 'caffeine'],
        component: Coffee,
    },
    {
        name: 'code',
        label: 'Code',
        tags: ['coding', 'programming', 'developer', 'work'],
        component: Code,
    },
    {
        name: 'wallet',
        label: 'Wallet',
        tags: ['money', 'finance', 'budget'],
        component: Wallet,
    },
    {
        name: 'music',
        label: 'Music',
        tags: ['song', 'practice', 'instrument'],
        component: Music,
    },
    {
        name: 'plane',
        label: 'Plane',
        tags: ['travel', 'trip', 'flight'],
        component: Plane,
    },
    {
        name: 'camera',
        label: 'Camera',
        tags: ['photo', 'photography', 'creative'],
        component: Camera,
    },
    {
        name: 'footprints',
        label: 'Footprints',
        tags: ['walk', 'walking', 'steps', 'exercise'],
        component: Footprints,
    },
    {
        name: 'salad',
        label: 'Salad',
        tags: ['food', 'diet', 'healthy', 'nutrition'],
        component: Salad,
    },
    {
        name: 'sunrise',
        label: 'Sunrise',
        tags: ['morning', 'routine', 'wake'],
        component: Sunrise,
    },
    {
        name: 'laptop',
        label: 'Laptop',
        tags: ['work', 'computer', 'productivity'],
        component: Laptop,
    },
    {
        name: 'brush',
        label: 'Brush',
        tags: ['art', 'creative', 'paint'],
        component: Brush,
    },
    {
        name: 'briefcase',
        label: 'Briefcase',
        tags: ['work', 'job', 'business'],
        component: Briefcase,
    },
    {
        name: 'bed',
        label: 'Bed',
        tags: ['sleep', 'relax'],
        component: Bed,
    },
    {
        name: 'utensils',
        label: 'Utensils',
        tags: ['eat', 'food', 'dinner', 'breakfast'],
        component: Utensils,
    },
    {
        name: 'ban',
        label: 'Ban',
        tags: ['no', 'circle', 'prohibit'],
        component: Ban,
    },
    {
        name: 'calendar-days',
        label: 'Calendar with Days',
        tags: [''],
        component: CalendarDays,
    },
];

export const FALLBACK_ICON = CircleHelp;

export function getIconByName(name?: string): IconOption {
    return (
        ICONS.find((icon) => icon.name === name) ?? {
            name: 'circle-help',
            label: 'Unknown',
            tags: [],
            component: FALLBACK_ICON,
        }
    );
}

export function searchIcons(query: string): IconOption[] {
    const q = query.trim().toLowerCase();

    if (!q) return ICONS;

    return ICONS.filter((icon) => {
        return (
            icon.name.includes(q) ||
            icon.label.toLowerCase().includes(q) ||
            icon.tags.some((tag) => tag.includes(q))
        );
    });
}
