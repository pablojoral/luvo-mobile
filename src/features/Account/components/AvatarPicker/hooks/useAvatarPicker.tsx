import { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AvatarOption } from '../../../avatars';
import { AvatarPickerItem } from '../AvatarPickerItem';

interface UseAvatarPickerProps {
  currentId: number;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export const useAvatarPicker = ({ currentId, onSelect, onClose }: UseAvatarPickerProps) => {
  const { t } = useTranslation('common');

  const renderItem = useCallback<ListRenderItem<AvatarOption>>(
    ({ item }) => (
      <AvatarPickerItem
        avatarId={item.id}
        selected={currentId === item.id}
        onPress={() => {
          onSelect(item.id);
          onClose();
        }}
      />
    ),
    [currentId, onSelect, onClose],
  );

  const keyExtractor = useCallback((item: AvatarOption) => String(item.id), []);

  return {
    renderItem,
    keyExtractor,
    title: t('account.avatarPicker.title'),
  };
};
