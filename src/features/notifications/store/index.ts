import { NotificationType } from '@prisma/client'
import { create } from 'zustand'

interface INotificationStore {
	type: NotificationType | 'ALL'
	setType: (type: NotificationType | 'ALL') => void
}

export const useNotificationsStore = create<INotificationStore>(set => ({
	type: 'ALL',
	setType: type => set({ type }),
}))
