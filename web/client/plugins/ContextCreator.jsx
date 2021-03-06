/**
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import ConfigUtils from '../utils/ConfigUtils';
import {createPlugin} from '../utils/PluginsUtils';
import {newContextSelector, resourceSelector, creationStepSelector, reloadConfirmSelector, showDialogSelector, isLoadingSelector,
    loadFlagsSelector, isValidContextNameSelector, contextNameCheckedSelector, pluginsSelector, editedPluginSelector, editedCfgSelector,
    validationStatusSelector, cfgErrorSelector, parsedTemplateSelector, fileDropStatusSelector, editedTemplateSelector,
    availablePluginsFilterTextSelector, availableTemplatesFilterTextSelector, enabledPluginsFilterTextSelector,
    enabledTemplatesFilterTextSelector, showBackToPageConfirmationSelector} from '../selectors/contextcreator';
import {mapTypeSelector} from '../selectors/maptype';
import {setCreationStep, changeAttribute, saveNewContext, saveTemplate, mapViewerReload, showMapViewerReloadConfirm, showDialog, setFilterText,
    setSelectedPlugins, setSelectedTemplates, setParsedTemplate, setFileDropStatus, editPlugin, editTemplate, deleteTemplate, updateEditedCfg,
    changePluginsKey, changeTemplatesKey, enablePlugins, disablePlugins, enableUploadPlugin, uploadPlugin, uninstallPlugin,
    uploadPluginError, showBackToPageConfirmation} from '../actions/contextcreator';
import contextcreator from '../reducers/contextcreator';
import * as epics from '../epics/contextcreator';
import ContextCreator from '../components/contextcreator/ContextCreator';

/**
 * Plugin for creation of Contexts.
 * @memberof plugins
 * @name ContextCreator
 * @class
 * @prop {string} cfg.saveDestLocation router path when the application is redirected when a context is saved
 */
export default createPlugin('ContextCreator', {
    component: connect(createStructuredSelector({
        curStepId: creationStepSelector,
        newContext: newContextSelector,
        resource: resourceSelector,
        allAvailablePlugins: pluginsSelector,
        editedPlugin: editedPluginSelector,
        editedCfg: editedCfgSelector,
        isCfgValidated: validationStatusSelector,
        cfgError: cfgErrorSelector,
        parsedTemplate: parsedTemplateSelector,
        editedTemplate: editedTemplateSelector,
        fileDropStatus: fileDropStatusSelector,
        availablePluginsFilterText: availablePluginsFilterTextSelector,
        enabledPluginsFilterText: enabledPluginsFilterTextSelector,
        availableTemplatesFilterText: availableTemplatesFilterTextSelector,
        enabledTemplatesFilterText: enabledTemplatesFilterTextSelector,
        mapType: mapTypeSelector,
        showReloadConfirm: reloadConfirmSelector,
        showDialog: showDialogSelector,
        loading: isLoadingSelector,
        loadFlags: loadFlagsSelector,
        isValidContextName: isValidContextNameSelector,
        contextNameChecked: contextNameCheckedSelector,
        uploadEnabled: state => state.contextcreator && state.contextcreator.uploadPluginEnabled,
        uploading: state => state.contextcreator && state.contextcreator.uploadingPlugin,
        pluginsConfig: () => ConfigUtils.getConfigProp('plugins'),
        showBackToPageConfirmation: showBackToPageConfirmationSelector
    }), {
        onFilterAvailablePlugins: setFilterText.bind(null, 'availablePlugins'),
        onFilterEnabledPlugins: setFilterText.bind(null, 'enabledPlugins'),
        onFilterAvailableTemplates: setFilterText.bind(null, 'availableTemplates'),
        onFilterEnabledTemplates: setFilterText.bind(null, 'enabledTemplates'),
        setSelectedPlugins,
        setSelectedTemplates,
        setParsedTemplate,
        setFileDropStatus,
        onEditPlugin: editPlugin,
        onEditTemplate: editTemplate,
        onUpdateCfg: updateEditedCfg,
        changePluginsKey,
        changeTemplatesKey,
        onEnablePlugins: enablePlugins,
        onDisablePlugins: disablePlugins,
        onSetStep: setCreationStep,
        onChangeAttribute: changeAttribute,
        onSave: saveNewContext,
        onSaveTemplate: saveTemplate,
        onDeleteTemplate: deleteTemplate,
        onMapViewerReload: mapViewerReload,
        onReloadConfirm: showMapViewerReloadConfirm,
        onEnableUploadPlugin: enableUploadPlugin,
        onUploadPlugin: uploadPlugin,
        onUploadPluginError: uploadPluginError,
        onShowDialog: showDialog,
        onRemovePlugin: uninstallPlugin,
        onShowBackToPageConfirmation: showBackToPageConfirmation
    })(ContextCreator),
    reducers: {
        contextcreator
    },
    epics
});
