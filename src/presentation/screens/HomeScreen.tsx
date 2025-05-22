import React, { useCallback, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing } from "@/presentation/theme";
import { SearchBar } from "@/presentation/components/shared/SearchBar/SearchBar";
import { FilterButton } from "@/presentation/components/shared/FilterButton/FilterButton";
import { CarRequestCard } from "@/presentation/components/shared/CarRequestCard/CarRequestCard";
import type { RootStackParamList } from "@/presentation/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCarRequests } from "@/presentation/hooks/useCarRequests";
import { FilterBottomSheet } from "@/presentation/components/shared/FilterBottomSheet/FilterBottomSheet";
import { EmptyState } from "@/presentation/components/shared/EmptyState/EmptyState";
import { ErrorState } from "@/presentation/components/shared/ErrorState/ErrorState";
import { LoadingState } from "@/presentation/components/shared/LoadingState/LoadingState";
import type { FilterState } from "@/presentation/components/shared/FilterBottomSheet/filters/types";
import { defaultFilters } from "@/presentation/components/shared/FilterBottomSheet/filters/types";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [activeFilters, setActiveFilters] =
    useState<FilterState>(defaultFilters);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useCarRequests({
    search: searchQuery,
    filters: {
      price: activeFilters.price || undefined,
      productionYear: activeFilters.year || undefined,
      type: activeFilters.type || undefined,
    },
  });

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterPress = useCallback(() => {
    console.log("Filter button pressed");
    setIsFilterVisible(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    console.log("Closing filter");
    setIsFilterVisible(false);
  }, []);

  const handleApplyFilters = useCallback((newFilters: FilterState) => {
    console.log("Applying filters:", newFilters);
    setActiveFilters(newFilters);
    setIsFilterVisible(false);
  }, []);

  const handleResetFilters = useCallback(() => {
    console.log("Resetting filters");
    setActiveFilters(defaultFilters);
    setFilters(defaultFilters);
  }, []);

  const handleFilterChange = {
    setPrice: (price: number | null) => {
      setFilters((prev) => ({ ...prev, price }));
    },
    setYear: (year: number | null) => {
      setFilters((prev) => ({ ...prev, year }));
    },
    setType: (type: string | null) => {
      setFilters((prev) => ({ ...prev, type }));
    },
  };

  const handleCarRequestPress = useCallback(
    (carRequest: any) => {
      navigation.navigate("CarDetails", { carRequest });
    },
    [navigation]
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CarRequestCard
        carRequest={item}
        onPress={() => handleCarRequestPress(item)}
      />
    ),
    [handleCarRequestPress]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchSubmit}
          onSubmitEditing={() => handleSearchSubmit(searchQuery)}
          placeholder="Search car requests..."
          returnKeyType="search"
        />
        <FilterButton
          onPress={handleFilterPress}
          isActive={
            activeFilters.price !== null ||
            activeFilters.year !== null ||
            activeFilters.type !== null
          }
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  // if (isError) {
  //   return <ErrorState onRetry={refetch} />;
  // }

  const carRequests = data?.pages.flatMap((page) => page.carRequests) || [];
  const hasActiveFilters =
    activeFilters.price !== null ||
    activeFilters.year !== null ||
    activeFilters.type !== null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={carRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            message={
              searchQuery || hasActiveFilters
                ? "No car requests found matching your criteria"
                : "No car requests available"
            }
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
});
