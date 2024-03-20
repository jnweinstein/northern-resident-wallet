// home screen
import React, { useState, useMemo } from 'react';
import type { CardProps, FontSizeTokens, SelectProps } from 'tamagui'
import { View, Text, H5, Button, Card, XStack, Separator, H4, Paragraph, Adapt, Select, Sheet, YStack, getFontSize, Label, styled } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

type BalanceProps = {
    name: string,
    balance: number
}

export default function Tab() {
  return (
    <View style={{ justifyContent: 'left', alignItems: 'left', flex: 1, margin: '1em' }}>
      <H4>Hello, Northern Resident</H4>
      <Separator marginVertical={15} style={{ width: '80%' }} maxWidth={800} borderColor={'midnightblue'} />
      <BalanceCard size="$5" style={{ width: '80%' }} maxWidth={800} />
      <YStack gap="$4" padding="$3">
      <XStack ai="center" gap="$4">
        <Label htmlFor="select-coin" f={1} miw={80} >
          Wallets
        </Label>
        <SelectDemoItem id="select-coin" />
      </XStack>
    </YStack>

    </View>
  );
}

export function BalanceCard(props: CardProps) {
  return (
    <Card elevate size="$5" bordered {...props}>
      <Card.Header padded>
        <H5>Your Balance</H5>
      </Card.Header>

      <Paragraph fontSize={30} paddingLeft={25} paddingBottom={10}>
        0 BTC
      </Paragraph>
      <Text fontSize={15} color="$blue" paddingLeft={25}>
        $0.00
      </Text>

      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>

      <Card.Background>
      </Card.Background>
    </Card>
  )
}

export function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('bitcoin')

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={120} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={100}
        >
          <Select.Group>
            <Select.Label>Coins</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                coins.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [coins]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

const coins = [
  { name: 'Bitcoin' },
]