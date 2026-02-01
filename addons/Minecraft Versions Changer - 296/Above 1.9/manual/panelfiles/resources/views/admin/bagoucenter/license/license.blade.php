@extends('layouts.admin')

@section('title')
    Whee Service
@endsection

@section('content-header')
    <h1>Whee Service Hub<small>Manage all Whee Service addons.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Whee Service Hub</li>
    </ol>
@endsection

@section('content')
@include('admin.bagoucenter.nav')
@include('admin.bagoucenter.license.nav', ['addon' => $addon, 'addonslist' => $addonslist])

    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">License Configuration
                        @if ($enabled == 1)
                            <span class="label label-success" style="margin-left: 10px;"><i class="fa fa-check"></i> Active</span>
                        @else
                            <span class="label label-danger" style="margin-left: 10px;"><i class="fa fa-times"></i> Inactive</span>
                        @endif
                    </h3>
                </div>
                <form action="{{ route('admin.bagoucenter.license.addon', $addon) }}" method="POST">
                    {{ csrf_field() }}
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="license">License Key</label>
                                    <input type="text" class="form-control" id="license" name="license" value="{{ old('license', $license) }}" placeholder="Your license key" />
                                    <small class="form-text text-muted">Enter your unique license key provided when purchased</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Addon Status</label>
                                    <div style="margin-top: 8px;">
                                        <div class="btn-group" data-toggle="buttons" style="width: 100%;">
                                            <label class="btn btn-default @if ($enabled == 1) active @endif" style="flex: 1; background-color: @if ($enabled == 1) #007bff @endif; color: @if ($enabled == 1) white @endif; border-color: @if ($enabled == 1) #0056b3 @endif;">
                                                <input type="radio" name="enabled" value="1" @if ($enabled == 1) checked @endif autocomplete="off"> 
                                                <i class="fa fa-check"></i> Enable
                                            </label>
                                            <label class="btn btn-default @if ($enabled == 0) active @endif" style="flex: 1; background-color: @if ($enabled == 0) #6c757d @endif; color: @if ($enabled == 0) white @endif; border-color: @if ($enabled == 0) #5a6268 @endif;">
                                                <input type="radio" name="enabled" value="0" @if ($enabled == 0) checked @endif autocomplete="off">
                                                <i class="fa fa-times"></i> Disable
                                            </label>
                                        </div>
                                    </div>
                                    <small class="form-text text-muted">Enable to activate, disable to deactivate</small>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="usage">Current Usage</label>
                                    <input type="text" class="form-control" id="usage" disabled value="{{ $usage ?? '0' }}" />
                                    <small class="form-text text-muted">Panels currently using this license</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="maxusage">Max Usage</label>
                                    <input type="text" class="form-control" id="maxusage" disabled value="{{ $maxusage ?? '0' }}" />
                                    <small class="form-text text-muted">Maximum allowed panels for this license</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Save Changes</button>
                        <a href="{{ route('admin.bagoucenter.license') }}" class="btn btn-default"><i class="fa fa-arrow-left"></i> Back</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
