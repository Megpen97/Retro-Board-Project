/**
 * The single source of truth for the board's columns.
 *
 */
export const COLUMNS = [
  { key: 'notStarted', title: 'New / Not Started' },
  { key: 'inProgress', title: 'In Progress' },
  { key: 'complete', title: 'Complete' },
];

export const CATEGORIES = COLUMNS.map((column) => column.key);
