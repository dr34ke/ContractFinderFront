if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/repo/go_workspace/src/github.com/dr34ke/ContractFinderFront/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/4l133451/obj/arm64-v8a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/repo/go_workspace/src/github.com/dr34ke/ContractFinderFront/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

