import SettingsHeader from './components/SettingsHeader';
import SettingsSectionShell from './components/SettingsSectionShell';
import SettingsChipRow from './components/SettingsChipRow';
import SettingsPricingCard from './components/SettingsPricingCard';
import SettingsItemModal from './components/SettingsItemModal';
import SettingsSubscriptionModal from './components/SettingsSubscriptionModal';
import SettingsDeleteConfirmModal from './components/SettingsDeleteConfirmModal';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useCreateAdminSubscriptionPlanMutation,
  useCreateAdminCategoryMutation,
  useCreateAdminWeddingStyleMutation,
  useDeleteAdminSubscriptionPlanMutation,
  useDeleteAdminCategoryMutation,
  useDeleteAdminWeddingStyleMutation,
  useGetAdminSubscriptionPlansQuery,
  useLazyGetAdminSubscriptionPlanByIdQuery,
  useUpdateAdminSubscriptionPlanMutation,
  useGetAdminCategoriesQuery,
  useGetAdminWeddingStylesQuery,
} from '../../../store/features/admin/adminDashboard/adminDashboardApi';

const createEmptyPlanForm = () => ({
  planName: '',
  priceMonthly: '',
  portfolioLimit: '',
  sortDescription: '',
  validFor: '1 Month',
  featuresAllowed: [{ name: '', isIncluded: true }],
});

const mapPlanToForm = (plan) => ({
  planName: plan?.planName || '',
  priceMonthly: String(plan?.priceMonthly ?? ''),
  portfolioLimit: String(plan?.portfolioLimit ?? ''),
  sortDescription: plan?.sortDescription || '',
  validFor: plan?.validFor || '1 Month',
  featuresAllowed:
    Array.isArray(plan?.featuresAllowed) && plan.featuresAllowed.length > 0
      ? plan.featuresAllowed.map((feature) => ({
          name: feature?.name || '',
          isIncluded: !!feature?.isIncluded,
        }))
      : [{ name: '', isIncluded: true }],
});

export default function Settings() {
  const [activeModal, setActiveModal] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newStyleName, setNewStyleName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [planForm, setPlanForm] = useState(createEmptyPlanForm());

  const { data: categoriesResponse, isLoading: isCategoriesLoading } =
    useGetAdminCategoriesQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnWindowFocus: true,
    });

  const { data: weddingStylesResponse, isLoading: isWeddingStylesLoading } =
    useGetAdminWeddingStylesQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnWindowFocus: true,
    });

  const { data: subscriptionPlansResponse, isLoading: isPlansLoading } =
    useGetAdminSubscriptionPlansQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnWindowFocus: true,
    });

  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateAdminCategoryMutation();
  const [createWeddingStyle, { isLoading: isCreating }] =
    useCreateAdminWeddingStyleMutation();
  const [createSubscriptionPlan, { isLoading: isCreatingPlan }] =
    useCreateAdminSubscriptionPlanMutation();
  const [updateSubscriptionPlan, { isLoading: isUpdatingPlan }] =
    useUpdateAdminSubscriptionPlanMutation();
  const [deleteSubscriptionPlan, { isLoading: isDeletingPlan }] =
    useDeleteAdminSubscriptionPlanMutation();
  const [fetchSubscriptionById, { isLoading: isFetchingPlan }] =
    useLazyGetAdminSubscriptionPlanByIdQuery();
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteAdminCategoryMutation();
  const [deleteWeddingStyle, { isLoading: isDeletingStyle }] =
    useDeleteAdminWeddingStyleMutation();

  const categories = categoriesResponse?.data || [];
  const weddingStyles = weddingStylesResponse?.data || [];
  const subscriptionPlans = subscriptionPlansResponse?.data || [];

  useEffect(() => {
    if (activeModal !== 'price') {
      setPlanForm(createEmptyPlanForm());
      setEditingPlanId(null);
    }
  }, [activeModal]);

  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) {
      toast.error('Category name is required.');
      return;
    }

    try {
      await createCategory({ name }).unwrap();
      toast.success('Category added successfully.');
      setNewCategoryName('');
      setActiveModal(null);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add category.');
    }
  };

  const handleCreateStyle = async () => {
    const name = newStyleName.trim();
    if (!name) {
      toast.error('Wedding style name is required.');
      return;
    }

    try {
      await createWeddingStyle({ name }).unwrap();
      toast.success('Wedding style added successfully.');
      setNewStyleName('');
      setActiveModal(null);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add wedding style.');
    }
  };

  const openDeleteCategoryModal = (item) => {
    setDeleteTarget({
      type: 'category',
      item,
      title: 'Delete Category',
    });
  };

  const openDeleteStyleModal = (item) => {
    setDeleteTarget({
      type: 'style',
      item,
      title: 'Delete Wedding Style',
    });
  };

  const handleDeleteCategory = async (item) => {
    if (!item?.id) {
      toast.error('Category id not found.');
      return;
    }

    try {
      await deleteCategory({ id: item.id }).unwrap();
      toast.success('Category deleted successfully.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete category.');
    }
  };

  const handleDeleteStyle = async (item) => {
    if (!item?.id) {
      toast.error('Wedding style id not found.');
      return;
    }

    try {
      await deleteWeddingStyle({ id: item.id }).unwrap();
      toast.success('Wedding style deleted successfully.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete wedding style.');
    }
  };

  const handlePlanFormChange = (field, value) => {
    setPlanForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setPlanForm((current) => ({
      ...current,
      featuresAllowed: current.featuresAllowed.map((feature, featureIndex) =>
        featureIndex === index ? { ...feature, [field]: value } : feature,
      ),
    }));
  };

  const handleAddFeature = () => {
    setPlanForm((current) => ({
      ...current,
      featuresAllowed: [...current.featuresAllowed, { name: '', isIncluded: false }],
    }));
  };

  const handleRemoveFeature = (index) => {
    setPlanForm((current) => ({
      ...current,
      featuresAllowed:
        current.featuresAllowed.length === 1
          ? current.featuresAllowed
          : current.featuresAllowed.filter((_, featureIndex) => featureIndex !== index),
    }));
  };

  const buildPlanPayload = () => {
    const cleanedFeatures = planForm.featuresAllowed
      .map((feature) => ({
        name: feature.name.trim(),
        isIncluded: !!feature.isIncluded,
      }))
      .filter((feature) => feature.name);

    return {
      planName: planForm.planName.trim(),
      priceMonthly: Number(planForm.priceMonthly),
      portfolioLimit: Number(planForm.portfolioLimit),
      sortDescription: planForm.sortDescription.trim(),
      validFor: planForm.validFor.trim(),
      featuresAllowed: cleanedFeatures,
    };
  };

  const validatePlanPayload = (payload) => {
    if (!payload.planName) return 'Plan name is required.';
    if (!Number.isFinite(payload.priceMonthly)) return 'Price is required.';
    if (!Number.isFinite(payload.portfolioLimit)) return 'Portfolio limit is required.';
    if (!payload.sortDescription) return 'Description is required.';
    if (!payload.validFor) return 'Valid for is required.';
    if (!payload.featuresAllowed.length) return 'At least one feature is required.';
    return null;
  };

  const openAddPricingModal = () => {
    setEditingPlanId(null);
    setPlanForm(createEmptyPlanForm());
    setActiveModal('price');
  };

  const openEditPricingModal = async (planId) => {
    setActiveModal('price');
    setEditingPlanId(planId);

    try {
      const response = await fetchSubscriptionById(planId).unwrap();
      setPlanForm(mapPlanToForm(response?.data));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to load subscription details.');
      setActiveModal(null);
      setEditingPlanId(null);
    }
  };

  const openDeletePricingModal = (plan) => {
    setDeleteTarget({
      type: 'pricing',
      item: { id: plan.id, name: plan.planName },
      title: 'Delete Subscription Plan',
    });
  };

  const handleSubmitPlan = async () => {
    const payload = buildPlanPayload();
    const validationMessage = validatePlanPayload(payload);

    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    try {
      if (editingPlanId) {
        await updateSubscriptionPlan({
          id: editingPlanId,
          body: payload,
        }).unwrap();
        toast.success('Subscription plan updated successfully.');
      } else {
        await createSubscriptionPlan(payload).unwrap();
        toast.success('Subscription plan added successfully.');
      }

      setActiveModal(null);
      setEditingPlanId(null);
      setPlanForm(createEmptyPlanForm());
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save subscription plan.');
    }
  };

  const handleDeletePricing = async (item) => {
    if (!item?.id) {
      toast.error('Subscription id not found.');
      return;
    }

    try {
      await deleteSubscriptionPlan({ id: item.id }).unwrap();
      toast.success('Subscription plan deleted successfully.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete subscription plan.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.item) {
      return;
    }

    if (deleteTarget.type === 'category') {
      await handleDeleteCategory(deleteTarget.item);
    }

    if (deleteTarget.type === 'style') {
      await handleDeleteStyle(deleteTarget.item);
    }

    if (deleteTarget.type === 'pricing') {
      await handleDeletePricing(deleteTarget.item);
    }

    setDeleteTarget(null);
  };

  return (
    <>
      <div className='space-y-8'>
        <SettingsHeader
          title='Powerful Settings Control for Complete Store Management'
          description='Customize categories, models, and pricing rules with full flexibility from your admin settings panel.'
        />

        <div className='space-y-4'>
          <SettingsSectionShell
            title='Category'
            actionLabel='Add Category'
            onActionClick={() => setActiveModal('category')}
          >
            {isCategoriesLoading ? (
              <p className='text-sm text-gray-500'>Loading categories...</p>
            ) : (
              <SettingsChipRow
                items={categories}
                onDelete={openDeleteCategoryModal}
              />
            )}
          </SettingsSectionShell>

          <SettingsSectionShell
            title='Wedding Style'
            actionLabel='Add Topics'
            onActionClick={() => setActiveModal('style')}
          >
            {isWeddingStylesLoading ? (
              <p className='text-sm text-gray-500'>Loading wedding styles...</p>
            ) : (
              <SettingsChipRow
                items={weddingStyles}
                onDelete={openDeleteStyleModal}
              />
            )}
          </SettingsSectionShell>

          <SettingsSectionShell
            title='Pricing'
            actionLabel='Add Price'
            onActionClick={openAddPricingModal}
          >
            {isPlansLoading ? (
              <p className='text-sm text-gray-500'>Loading pricing plans...</p>
            ) : (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {subscriptionPlans.map((plan) => {
                  const features = (plan.featuresAllowed || [])
                    .filter((feature) => feature.isIncluded)
                    .map((feature) => feature.name);

                  const disabledFeatures = (plan.featuresAllowed || [])
                    .filter((feature) => !feature.isIncluded)
                    .map((feature) => feature.name);

                  return (
                    <SettingsPricingCard
                      key={plan.id}
                      title={plan.planName}
                      price={`$${plan.priceMonthly}`}
                      description={plan.sortDescription}
                      features={features}
                      disabled={disabledFeatures}
                      featured={String(plan.planName || '').toLowerCase() === 'professional'}
                      onEdit={() => openEditPricingModal(plan.id)}
                      onDelete={() => openDeletePricingModal(plan)}
                      isActionLoading={
                        isDeletingPlan ||
                        isUpdatingPlan ||
                        (isFetchingPlan && editingPlanId === plan.id)
                      }
                    />
                  );
                })}
              </div>
            )}
          </SettingsSectionShell>
        </div>
      </div>

      <SettingsItemModal
        open={activeModal === 'category'}
        title='Category name'
        placeholder='Category name'
        submitLabel='Save'
        value={newCategoryName}
        onChange={setNewCategoryName}
        onSubmit={handleCreateCategory}
        isSubmitting={isCreatingCategory}
        onClose={() => setActiveModal(null)}
      />

      <SettingsItemModal
        open={activeModal === 'style'}
        title='Wedding Style'
        placeholder='Wedding style name'
        submitLabel='Save'
        value={newStyleName}
        onChange={setNewStyleName}
        onSubmit={handleCreateStyle}
        isSubmitting={isCreating}
        onClose={() => setActiveModal(null)}
      />

      <SettingsSubscriptionModal
        open={activeModal === 'price'}
        mode={editingPlanId ? 'edit' : 'create'}
        form={planForm}
        isSubmitting={isCreatingPlan || isUpdatingPlan}
        isLoading={isFetchingPlan}
        onSubmit={handleSubmitPlan}
        onChange={handlePlanFormChange}
        onFeatureChange={handleFeatureChange}
        onAddFeature={handleAddFeature}
        onRemoveFeature={handleRemoveFeature}
        onClose={() => setActiveModal(null)}
      />

      <SettingsDeleteConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.title || 'Delete Item'}
        itemName={deleteTarget?.item?.name || 'this item'}
        isDeleting={
          deleteTarget?.type === 'category'
            ? isDeletingCategory
            : deleteTarget?.type === 'style'
              ? isDeletingStyle
              : isDeletingPlan
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
