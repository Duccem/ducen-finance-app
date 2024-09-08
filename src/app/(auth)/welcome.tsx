import image1 from '@/src/assets/images/brand/172.png';
import image2 from '@/src/assets/images/brand/211.png';
import image3 from '@/src/assets/images/brand/367.png';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInRight } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';

const images = [image1, image2, image3];

const WelcomePage = () => {
  const sheet = useRef<BottomSheet>(null);
  const swiper = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-background-primary">
        <View className="flex flex-col h-full bg-brand-primary">
          <View className="flex flex-row w-full items-center justify-center absolute top-16">
            <View className="h-[450px] w-[450px] rounded-full justify-center items-center">
              {activeIndex === 0 && (
                <Animated.Image
                  entering={SlideInRight.duration(400)}
                  source={images[0]}
                  resizeMode="contain"
                  className="w-full h-full"
                />
              )}
              {activeIndex === 1 && (
                <Animated.Image
                  entering={SlideInRight.duration(400)}
                  source={images[1]}
                  resizeMode="contain"
                  className="w-full h-full"
                />
              )}
              {activeIndex === 2 && (
                <Animated.Image
                  entering={SlideInRight.duration(400)}
                  source={images[2]}
                  resizeMode="contain"
                  className="w-full h-full"
                />
              )}
            </View>
          </View>
        </View>
        <BottomSheet
          ref={sheet}
          index={0}
          snapPoints={['35%']}
          backgroundComponent={({ style }) => (
            <Animated.View
              style={[style, { backgroundColor: '#F0F0F0', borderRadius: 20 }]}
            />
          )}
        >
          <BottomSheetView
            style={{
              flex: 1,
              paddingTop: 10,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <Swiper
              style={{ zIndex: 50 }}
              ref={swiper}
              loop={false}
              index={0}
              onIndexChanged={(index) => setActiveIndex(index)}
              renderPagination={(index, total, context) => {
                return (
                  <View className="flex flex-row justify-between items-center w-full px-4 py-2">
                    <View className="w-[20%] flex flex-row justify-start items-center">
                      {Array.from({ length: total }).map((_, i) => (
                        <TouchableOpacity
                          onPress={() => swiper.current?.scrollTo(i, true)}
                          key={i}
                          className={`w-[8px] h-[8px] mx-1 bg-foreground-third rounded-full ${
                            i === index ? 'bg-foreground-primary w-[32px]' : ''
                          }`}
                        />
                      ))}
                    </View>
                    <View>
                      <TouchableOpacity
                        className="w-full flex justify-end items-end p-5"
                        onPress={() => {
                          router.push('/(auth)/sign-up');
                        }}
                      >
                        <Text className="text-black underline text-md font-NunitoBold">
                          Skip
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      className="rounded-3xl h-[42px] flex flex-row justify-between pl-3 pr-1  items-center bg-foreground-primary relative"
                      onPress={() =>
                        index === total - 1
                          ? router.push('/(auth)/sign-up')
                          : swiper.current?.scrollBy(1)
                      }
                    >
                      <Text className="text-background-third font-NunitoBold text-xs mr-4">
                        {index === total - 1 ? 'Get Started' : 'Next'}
                      </Text>
                      <View className="h-[36px] w-[36px] rounded-full bg-background-third flex justify-center items-center">
                        <ArrowRight
                          className="text-foreground-primary"
                          size={15}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            >
              <View className="h-full flex flex-col">
                <Text className="text-3xl font-NunitoBold mb-5">
                  Manage your finance with ease
                </Text>
                <Text className="text-sm font-NunitoMedium text-foreground-secondary">
                  Start tracking your expenses, create personal or family
                  budgets, and set financial goals.
                </Text>
              </View>
              <View className="h-ful flex flex-col">
                <Text className="text-3xl font-NunitoBold">
                  Sync your finance with bank accounts
                </Text>
                <Text className="text-sm font-NunitoMedium text-foreground-secondary">
                  Sync your bank account with the app, allowing all transactions
                  to be automatically tracked.
                </Text>
              </View>
              <View className="h-ful flex flex-col">
                <Text className="text-3xl font-NunitoBold">
                  Scan the receipt to upload the data
                </Text>
                <Text className="text-sm font-NunitoMedium text-foreground-secondary">
                  Simply scan the receipt to quickly and easily upload the
                  information about your purchases.
                </Text>
              </View>
            </Swiper>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default WelcomePage;
