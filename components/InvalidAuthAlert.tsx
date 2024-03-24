// import { useState } from 'react'
// import { AlertDialog, Button, XStack, YStack } from 'tamagui'
// const InvalidAuthAlert = ({ setHidden}) => {
//   const [isOpen, setIsOpen] = useState(visible);
  
//   return (
//     <AlertDialog native open={isOpen}>
//       {/* <AlertDialog.Trigger asChild>
//         <Button>Show Alert</Button>
//       </AlertDialog.Trigger> */}
//       <AlertDialog.Portal>
//         <AlertDialog.Overlay
//           key="overlay"
//           animation="quick"
//           opacity={0.5}
//           enterStyle={{ opacity: 0 }}
//           exitStyle={{ opacity: 0 }}
//         />
//         <AlertDialog.Content
//           bordered
//           elevate
//           key="content"
//           animation={[
//             'quick',
//             {
//               opacity: {
//                 overshootClamping: true,
//               },
//             },
//           ]}
//           enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
//           exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
//           x={0}
//           scale={1}
//           opacity={1}
//           y={0}
//         >
//           <YStack gap>
//             <AlertDialog.Title>Invalid Credentials</AlertDialog.Title>
//             <AlertDialog.Description>
//               Please enter the correct username and password.
//             </AlertDialog.Description>
//             <XStack gap="$3" justifyContent="flex-end">
//               <AlertDialog.Action asChild>
//                 <Button theme="active" onPress={() => setIsOpen(prev => !prev)}>Okay</Button>
//               </AlertDialog.Action>
//             </XStack>
//           </YStack>
//         </AlertDialog.Content>
//       </AlertDialog.Portal>
//     </AlertDialog>
//   )
// }
// export default InvalidAuthAlert;