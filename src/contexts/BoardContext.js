import { createContext } from 'react';

/**
 * The board's shared state, provided by BoardProvider.
 *
 * Kept in its own module (with no component exports) so that editing the
 * provider does not force a full page reload during development.
 */
export const BoardContext = createContext();
