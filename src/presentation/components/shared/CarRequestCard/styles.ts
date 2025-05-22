import { StyleSheet } from "react-native";
import { colors } from "@/presentation/theme/colors";
import { spacing } from "@/presentation/theme/spacing";
import { typography } from "@/presentation/theme/typography";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: colors.gray[100],
  },
  status: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  statusText: {
    ...typography.caption,
    fontWeight: "600",
  },
  statusPending: {
    backgroundColor: colors.yellow[100],
  },
  statusTextPending: {
    color: colors.yellow[700],
  },
  statusApproved: {
    backgroundColor: colors.green[100],
  },
  statusTextApproved: {
    color: colors.green[700],
  },
  statusRejected: {
    backgroundColor: colors.red[100],
  },
  statusTextRejected: {
    color: colors.red[700],
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.gray[900],
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.h3,
    color: colors.primary[600],
    fontWeight: "700",
  },
  details: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
  },
  detailText: {
    ...typography.body2,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  ownerSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  ownerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    ...typography.body2,
    color: colors.gray[900],
    fontWeight: "600",
    marginBottom: 2,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    ...typography.caption,
    color: colors.gray[600],
    marginLeft: spacing.xs,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  type: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  typeText: {
    ...typography.caption,
    color: colors.primary[700],
    fontWeight: "600",
  },
  date: {
    ...typography.caption,
    color: colors.gray[500],
  },
});
