package com.luvomobile

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList = PackageList(this).packages.apply {},
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
    createNotificationChannels()
  }

  private fun createNotificationChannels() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    manager.createNotificationChannels(
      listOf(
        NotificationChannel(
          "cycle_complete",
          "Cycle complete",
          NotificationManager.IMPORTANCE_HIGH,
        ).apply { description = "Alerts when your laundry cycle finishes" },
        NotificationChannel(
          "promotions",
          "Promotions",
          NotificationManager.IMPORTANCE_DEFAULT,
        ).apply { description = "Offers and promotions" },
        NotificationChannel(
          "maintenance",
          "Maintenance",
          NotificationManager.IMPORTANCE_DEFAULT,
        ).apply { description = "Machine maintenance alerts" },
      )
    )
  }
}
