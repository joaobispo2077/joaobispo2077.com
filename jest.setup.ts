// Match CI (Ubuntu default) and Intl formatting so date snapshots are stable across machines.
process.env.TZ = 'UTC';

import '@testing-library/jest-dom';

