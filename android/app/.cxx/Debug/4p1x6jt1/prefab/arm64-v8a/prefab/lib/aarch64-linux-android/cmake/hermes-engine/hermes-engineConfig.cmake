if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Dariusz Kubacki/.gradle/caches/transforms-3/124c69f97d4ee53162020cbde167e633/transformed/jetified-hermes-android-0.73.4-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Dariusz Kubacki/.gradle/caches/transforms-3/124c69f97d4ee53162020cbde167e633/transformed/jetified-hermes-android-0.73.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

