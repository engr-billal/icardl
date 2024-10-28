import {
  HStack,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  VStack,
  Box,
} from "@chakra-ui/react";
import { TfiArrowTopRight } from "react-icons/tfi";

const ProfileSkeleton = () => {
  return (
    <div className="w-full bg-[#f8f8f8]">
      <div className="relative rounded-[24px] w-full bg-white p-[24px] overflow-hidden space-y-3">
        <HStack alignItems="center">
          <SkeletonCircle boxSize={82} />
          <VStack flexGrow={1}>
            <SkeletonText w="100%" skeletonHeight={25} noOfLines={1} />
            <SkeletonText w="100%" lineHeight={15} noOfLines={1} />
            <SkeletonText w="100%" lineHeight={15} noOfLines={1} />
          </VStack>
        </HStack>
        <HStack>
          <Skeleton w="50%" h="40px" rounded={8} />
          <Skeleton w="50%" h="40px" rounded={8} />
        </HStack>
      </div>

      {[1, 2, 3].map((_, i) => (
        <HStack
          className="rounded-[14px] bg-white p-[20px] mt-[15px] hover:scale-105 transition-all justify-between items-center"
          key={i}
        >
          <SkeletonText skeletonHeight={13} w={100} noOfLines={1} />
          <SkeletonText skeletonHeight={15} w={70} noOfLines={1} />
        </HStack>
      ))}
      {[1, 2, 4].map((_, i) => (
        <HStack
          className="rounded-[14px] bg-white p-[20px] mt-[15px] hover:scale-105 transition-all justify-between items-center"
          key={i}
        >
          <HStack>
            <SkeletonText
              skeletonHeight={35}
              w={35}
              noOfLines={1}
              rounded={20}
            />
            <SkeletonText skeletonHeight={13} w={100} noOfLines={1} />
          </HStack>
          <TfiArrowTopRight />
        </HStack>
      ))}
    </div>
  );
};

export default ProfileSkeleton;
