import { Suspense } from "react";

import { withColorScheme } from "app/components/memo-with-theme";
import { Notifications } from "app/components/notifications";

import { View, Text, Spinner } from "design-system";

const NotificationsScreen = withColorScheme(() => {
  return (
    <Suspense
      fallback={
        <View tw="mt-10 items-center justify-center">
          <Spinner size="medium" />
        </View>
      }
    >
      <Notifications />
    </Suspense>
  );
});

export { NotificationsScreen };
