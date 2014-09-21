# Hybrid App Kit #

This hybrid app kit features Kendo UI Mobile, FastClick and jQuery. 

## How to Run Locally ##

This is ideal for browser based testing. Because this uses CORS you should have no issue using your desktop or mobile browser. You can access your app by going to [http://localhost:8001/](http://localhost:8001/). If you are testing your phone on a local network, then make sure the port is open. For example on Windows, the firewall will need port 8001 opened for a private network. Then on your mobile phone you'd go to [http://192.168.1.x:8001/](http://192.168.1.x:8001/)

	php -S 0.0.0.0:8001

## How to Run Externally as an App ##

**AppBuilder**

The easiest method is to use AppBuilder, the online editor, or windows client. They have a dedicated iOS/Android/Windows Phone app for testing apps that don't require extra plugins.

**PhoneGap**

Adobe offers a free build service for your app, but only one private app. They have pricing for more, and they are afforable. See [Adobe PhoneGap](https://build.phonegap.com/) for their online service. They build iOS, Android, Windows Phone, Blackberry, and webOS.

**Cordova**

This should be an easy process, but you have to download the SDKs. Also this depends on the SDK you can install. For example if you are on linux you cannot build for iOS or Windows Phone. Here are a few guides for each OS.

1. Ubuntu - [Apache Cordova development environment install on Ubuntu](http://www.gaggl.com/2014/04/apache-cordova-development-environment-install-on-ubuntu/)
2. Android - Windows & Mac [Android Platform Guide](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)
3. iOS - Mac [iOS Platform Guide](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)

## How to Test ##

As you build your application you will need to test on various devices.

### Testing on Android ###

You have a lot of options for testing on android here are a few:

1. **Android AVD** - very slow. You can install **haxm** if you have a compatible **Intel CPU**
2. **[GenyMotion](http://www.genymotion.com/)** - fast, if you have the a CPU that supports **virtualization**. It free for personal use. They only support Android 4.1+
3. **[Manymo](https://www.manymo.com/)** - fast, this is an online service. You can use their emulators without an account, but have 5 minutes of use. You can make a free account with 10 launches (not time limit) a month. You can also upload your APK through their interface. They do support remote debugging, via [Manymo Command Line Tools](https://www.manymo.com/pages/documentation/manymo-command-line-tool).

### Testing on iOS ##

You need an iOS device or OS X machine period... 

1. Cheap - Remote Desktop Services like [macincloud.com](http://macincloud.com)
2. Less Cheap - Rent a Mac Sever like [macstadium.com](https://macstadium.com/dedicated)
3. Expensive - Rent a Mac Machine [MacHollyWood](http://machollywood.com/rental/)

## How to Debug ##

Make sure to turn on USB debugging in the settings application. Android has a great guide on this process, [Using Hardware Devices](http://developer.android.com/tools/device.html)

### iOS ###

You are limited in options. Use Telerik AppBuilder (Windows Only), or Safari on Mac. Make sure to turn on the Web Inspector on your iOS device / simulator. You can do that by going to Settings > Safari > Advanced > Web Inspector.

**Safari**

You need to enable the Developer menu. You can do this in Safari's preferences > Advanced > Show Developer Menu Bar. For an extensive guide see [Enabling Web Inspector](https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html#//apple_ref/doc/uid/TP40007874-CH2-SW2)

**App Builder**

This is only available on Windows. The command line / online edition of app builder does not support this yet, as this feature is still experimental. For an extensive guide on using the debugger see [Debug on iOS device from the AppBuilder Windows client](http://docs.telerik.com/platform/appbuilder/debugging-your-code/debugging-on-device/debug-on-ios-device#debug-on-ios-device-from-the-appbuilder-windows-client)

### Android 4.4+ ###

Chrome has an extensive how to, see [Remote Debugging on Android with Chrome](https://developer.chrome.com/devtools/docs/remote-debugging)

### Android 4.3 and Lower ###

Pain and misery will arise, as you do not have the ability to fully debug your application. You can use Android's `adb` and catlog your console.log, or you can just alerts. If you need a visual on how the HTML / CSS is structures you can download and run **weinre**

**Using Weinre**

This is a great tool but has limited functionality. You cannot see **pseudo CSS** styling like *::before* and *::after*. You also cannot see **backtraces** from JavaScript errors, or startup errors. 

Install using NodeJS.

	sudo npm -g install weinre

Running Weinre (From your development machine).

	weinre --boundHost 0.0.0.0

Then add this in your mobile application. Remember to use your local private network IP address in place of localhost.

	<script src="http://localhost:8080/target/target-script-min.js#anonymous"></script>

To see the debugger + console go to your browser and access [http://localhost:8080/client/#anonymous](http://localhost:8080/client/#anonymous).

**Using CatLog**

You only need to use CatLog when you have javascript that are not showing up. CatLog encompasses everything running on your device so you may want to use a filter tool like **grep**. As a note **Android Studio** comes with a CatLog viewer. As a warning if you have multiple devices running you cannot use CatLog at all, unless you target a device (i think).