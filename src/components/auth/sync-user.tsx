'use client';

import { useEffect, useState } from 'react';
import { useConvexAuth } from 'convex/react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function SyncUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasSynced) {
      storeUser()
        .then(() => setHasSynced(true))
        .catch(console.error);
    }
  }, [isLoading, isAuthenticated, hasSynced, storeUser]);

  return null;
}
