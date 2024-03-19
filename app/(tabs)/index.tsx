// home screen
import type { CardProps } from 'tamagui'
import { View, Text } from 'react-native';

import { Button, Card, H2, Image, Paragraph, YStack, XStack } from 'tamagui'

type BalanceProps = {
    name: string,
    balance: number
}

export default function Tab() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text> Tab [Home|Settings]</Text>
    </View>
  );
}

export function CardDemo() {
  return (
    <YStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
      <DemoCard
        animation="bouncy"
        size="$4"
        width={250}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />
      <DemoCard size="$5" width={250} height={300} />
    </YStack>
  )
}
export function DemoCard(props: CardProps, name: string) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <H2>{name}</H2>
        <Paragraph theme="alt2">Balance</Paragraph>
      </Card.Header>
      
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>
      <Card.Background>
      </Card.Background>
    </Card>

  )

}
