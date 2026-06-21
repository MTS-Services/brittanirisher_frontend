import { useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import StateAndCityHeader from './components/StateAndCityHeader';
import StateCityFormModal from './components/StateCityFormModal';
import SettingsDeleteConfirmModal from '../settings/components/SettingsDeleteConfirmModal';
import { SkeletonBlock } from '../../../components/skeletons/LoadingSkeletons';
import {
  useGetAdminStatesQuery,
  useCreateAdminStateMutation,
  useUpdateAdminStateMutation,
  useDeleteAdminStateMutation,
  useCreateAdminCityMutation,
  useUpdateAdminCityMutation,
  useDeleteAdminCityMutation,
} from '../../../store/features/admin/adminDashboard/adminDashboardApi';

const StateAndCity = () => {
  const { data: statesResponse, isLoading } = useGetAdminStatesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createState, { isLoading: isCreatingState }] =
    useCreateAdminStateMutation();
  const [updateState, { isLoading: isUpdatingState }] =
    useUpdateAdminStateMutation();
  const [deleteState, { isLoading: isDeletingState }] =
    useDeleteAdminStateMutation();
  const [createCity, { isLoading: isCreatingCity }] =
    useCreateAdminCityMutation();
  const [updateCity, { isLoading: isUpdatingCity }] =
    useUpdateAdminCityMutation();
  const [deleteCity, { isLoading: isDeletingCity }] =
    useDeleteAdminCityMutation();

  const [formModal, setFormModal] = useState(null);
  const [formName, setFormName] = useState('');
  const [formStateId, setFormStateId] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const states = statesResponse?.data || [];

  const closeFormModal = () => {
    setFormModal(null);
    setFormName('');
    setFormStateId('');
  };

  const openStateCreate = () => {
    setFormName('');
    setFormStateId('');
    setFormModal({ type: 'state', mode: 'create' });
  };

  const openStateEdit = (state) => {
    setFormName(state.name || '');
    setFormStateId('');
    setFormModal({ type: 'state', mode: 'edit', item: state });
  };

  const openCityCreate = (stateId) => {
    setFormName('');
    setFormStateId(stateId);
    setFormModal({ type: 'city', mode: 'create', stateId });
  };

  const openCityEdit = (city) => {
    setFormName(city.name || '');
    setFormStateId(city.stateId || '');
    setFormModal({ type: 'city', mode: 'edit', item: city });
  };

  const handleFormSubmit = async () => {
    const name = formName.trim();
    if (!name) {
      toast.error('Name is required.');
      return;
    }

    try {
      if (formModal?.type === 'state') {
        if (formModal.mode === 'create') {
          await createState({ name }).unwrap();
          toast.success('State added successfully.');
        } else {
          await updateState({ id: formModal.item.id, body: { name } }).unwrap();
          toast.success('State updated successfully.');
        }
      } else if (formModal?.type === 'city') {
        if (formModal.mode === 'create') {
          if (!formStateId) {
            toast.error('Please select a state.');
            return;
          }
          await createCity({ name, stateId: formStateId }).unwrap();
          toast.success('City added successfully.');
        } else {
          await updateCity({ id: formModal.item.id, body: { name } }).unwrap();
          toast.success('City updated successfully.');
        }
      }

      closeFormModal();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === 'state') {
        await deleteState(deleteTarget.item.id).unwrap();
        toast.success('State deleted successfully.');
      } else {
        await deleteCity(deleteTarget.item.id).unwrap();
        toast.success('City deleted successfully.');
      }
      setDeleteTarget(null);
    } catch (error) {
      toast.error(
        error?.data?.message || 'Failed to delete. Please try again.',
      );
    }
  };

  const isFormSubmitting =
    isCreatingState || isUpdatingState || isCreatingCity || isUpdatingCity;
  const isDeleting = isDeletingState || isDeletingCity;

  return (
    <div className='space-y-8'>
      <StateAndCityHeader />

      <section className='rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
          <h2 className='text-lg sm:text-xl font-playfair font-semibold text-gray-900'>
            States & Cities
          </h2>
          <button
            type='button'
            onClick={openStateCreate}
            className='inline-flex items-center gap-1 rounded-sm bg-[#A7B9A6] px-3 py-2 text-sm text-white shadow-sm'
          >
            <Plus size={16} />
            Add State
          </button>
        </div>

        <div className='px-4 py-4 space-y-4'>
          {isLoading ? (
            <>
              <SkeletonBlock className='h-28 w-full' />
              <SkeletonBlock className='h-28 w-full' />
            </>
          ) : states.length === 0 ? (
            <p className='text-sm text-gray-500 py-6 text-center'>
              No states found. Add your first state to get started.
            </p>
          ) : (
            states.map((state) => (
              <article
                key={state.id}
                className='rounded-lg border border-gray-100 bg-[#fdfcfb] p-4'
              >
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <div>
                    <h3 className='text-base font-semibold text-gray-900'>
                      {state.name}
                    </h3>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {state.cities?.length || 0} cities
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => openCityCreate(state.id)}
                      className='inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
                    >
                      <Plus size={14} />
                      Add City
                    </button>
                    <button
                      type='button'
                      onClick={() => openStateEdit(state)}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition hover:text-[#A7B9A6]'
                      aria-label={`Edit ${state.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type='button'
                      onClick={() =>
                        setDeleteTarget({ type: 'state', item: state })
                      }
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:text-red-500'
                      aria-label={`Delete ${state.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className='mt-4 flex flex-wrap gap-2'>
                  {(state.cities || []).length === 0 ? (
                    <p className='text-sm text-gray-400'>No cities yet.</p>
                  ) : (
                    state.cities.map((city) => (
                      <div
                        key={city.id}
                        className='inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700'
                      >
                        <span>{city.name}</span>
                        <button
                          type='button'
                          onClick={() => openCityEdit(city)}
                          className='text-gray-400 transition hover:text-[#A7B9A6]'
                          aria-label={`Edit ${city.name}`}
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            setDeleteTarget({ type: 'city', item: city })
                          }
                          className='text-gray-400 transition hover:text-red-500'
                          aria-label={`Delete ${city.name}`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <StateCityFormModal
        open={!!formModal}
        type={formModal?.type}
        mode={formModal?.mode}
        name={formName}
        stateId={formStateId}
        states={states}
        onNameChange={setFormName}
        onStateIdChange={setFormStateId}
        onSubmit={handleFormSubmit}
        isSubmitting={isFormSubmitting}
        onClose={closeFormModal}
      />

      <SettingsDeleteConfirmModal
        open={!!deleteTarget}
        title={
          deleteTarget?.type === 'state' ? 'Delete State' : 'Delete City'
        }
        itemName={deleteTarget?.item?.name || ''}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default StateAndCity;
