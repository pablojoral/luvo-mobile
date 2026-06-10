import { useState } from 'react';
import { useLinkApple, useLinkedProviders, useUnlinkApple } from 'query/Auth/useAuth';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useAccountAppleLinkStrings } from './useAccountAppleLinkStrings';

const APPLE_PROVIDER_ID = 'apple.com';

export const useAccountAppleLink = () => {
  const strings = useAccountAppleLinkStrings();
  const addMessage = useMessagesStore(s => s.addMessage);
  const [confirmUnlink, setConfirmUnlink] = useState(false);

  const { data: providers } = useLinkedProviders();
  const appleProvider = providers?.find(p => p.providerId === APPLE_PROVIDER_ID);
  const isLinked = !!appleProvider;
  const appleEmail = appleProvider?.email ?? null;

  const { mutate: linkApple, isPending: isLinking } = useLinkApple();
  const { mutate: unlinkApple, isPending: isUnlinking } = useUnlinkApple();

  const handleLink = () => {
    linkApple(undefined, {
      onError: () => addMessage({ title: strings.genericError, body: strings.linkFailed }),
    });
  };

  const handleUnlink = () => {
    setConfirmUnlink(false);
    unlinkApple(undefined, {
      onError: () => addMessage({ title: strings.genericError, body: strings.unlinkFailed }),
    });
  };

  return {
    isLinked,
    appleEmail,
    isLoading: isLinking || isUnlinking,
    confirmUnlink,
    openConfirmUnlink:   () => setConfirmUnlink(true),
    cancelConfirmUnlink: () => setConfirmUnlink(false),
    handleLink,
    handleUnlink,
    strings,
  };
};
