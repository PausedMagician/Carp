/**
 * Booking constants
 */
export const BOOKING_CONSTANTS = {
    MAX_PURPOSE_LENGTH: 100,
    GESTURE_THRESHOLD: {
        MOVE: 10,
        DURATION: 200,
    },
    DATE_SELECTION: {
        ALERT_TIMEOUT: 2000,
    },
} as const;

/**
 * Booking status values
 */
export const BOOKING_STATUS = {
    BOOKED: 'Booked',
    CANCELLED: 'Cancelled',
    COMPLETED: 'Completed',
    ONGOING: 'Ongoing',
    PLANNED: 'Planned',
    FINISHED: 'Finished',
} as const;